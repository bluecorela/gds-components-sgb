import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-gds-select',
  templateUrl: './gds-select.html',
  styleUrl: './gds-select.scss',
  standalone: false,
})
export class GdsSelect implements OnInit, OnChanges, OnDestroy {
  /** FormControl que almacena el valor seleccionado */
  @Input() formController!: FormControl;

  @Input() placeholder: string = '';
  @Input() optional: boolean = false;

  /** Lista de objetos con etiqueta configurable por `key` */
  @Input() items: any[] | null = null;

  /** Lista simple de strings */
  @Input() list: string[] | null = null;

  /** Propiedad del objeto que se usa como etiqueta visible */
  @Input() key: string = 'label';

  /** Habilita el campo de búsqueda dentro del dropdown */
  @Input() enableSearch: boolean = false;

  /** Activa carga por lotes para listas muy grandes (>250 elementos) */
  @Input() optimizeLargeList: boolean = false;

  /** Mensajes de validación: [{ type: 'required', message: 'Campo requerido' }] */
  @Input() validations?: Array<{ type: string; message: string }>;

  /** Emite el FormControl tras seleccionar una opción */
  @Output() valueChange = new EventEmitter<FormControl>();

  filteredList: any[] = [];
  isLargeListCapped = false;
  isOpen = false;
  currentSearchValue = '';

  private internalList: any[] = [];
  private fullFilteredList: any[] = [];
  private currentBatchSize = 0;
  private panelElement?: HTMLElement;
  private readonly destroy$ = new Subject<void>();

  private readonly PANEL_BOTTOM_THRESHOLD = 24;
  private readonly LARGE_LIST_THRESHOLD = 250;
  private readonly LARGE_LIST_INITIAL_ITEMS = 120;

  ngOnInit(): void {
    this.internalList = this.items ?? this.list ?? [];
    this.applyDefaultFilteredList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['list']) {
      this.internalList = this.items?.length
        ? this.items
        : this.list?.length
          ? this.list
          : [];
      this.applyDefaultFilteredList();
    }
  }

  ngOnDestroy(): void {
    this.detachPanelScrollListener();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Panel events ───────────────────────────────────────────────────────────

  onPanelToggle(isOpen: boolean): void {
    this.isOpen = isOpen;
    if (isOpen) {
      this.attachPanelScrollListener();
    } else {
      this.resetSearch();
      this.detachPanelScrollListener();
    }
  }

  onSelectionChange(): void {
    this.valueChange.emit(this.formController);
  }

  // ── Search integration ─────────────────────────────────────────────────────

  onSearchChange(term: string): void {
    this.currentSearchValue = term;
    this.filterList(term);
  }

  onSearchCleared(): void {
    this.currentSearchValue = '';
    this.applyDefaultFilteredList();
  }

  // ── Display helpers ────────────────────────────────────────────────────────

  getOptionLabel(option: any): string {
    if (typeof option === 'string') return option;
    return option?.[this.key] ?? '';
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  get errorMessage(): string | null {
    if (!this.formController?.touched || !this.validations) return null;
    for (const v of this.validations) {
      if (this.formController.hasError(v.type)) return v.message;
    }
    return null;
  }

  // ── Private: filtering ─────────────────────────────────────────────────────

  private filterList(term: string): void {
    if (!term.trim()) {
      this.applyDefaultFilteredList();
      return;
    }
    const lower = term.toLowerCase();
    this.fullFilteredList = this.internalList.filter((option) =>
      typeof option === 'string'
        ? option.toLowerCase().includes(lower)
        : option[this.key]?.toLowerCase().includes(lower)
    );
    this.applyBatchFilteredList();
  }

  private applyDefaultFilteredList(): void {
    this.fullFilteredList = [...this.internalList];
    this.applyBatchFilteredList();
  }

  private applyBatchFilteredList(): void {
    const shouldBatch =
      this.enableSearch &&
      this.optimizeLargeList &&
      this.fullFilteredList.length > this.LARGE_LIST_THRESHOLD;

    if (shouldBatch) {
      this.currentBatchSize = this.LARGE_LIST_INITIAL_ITEMS;
      this.filteredList = this.fullFilteredList.slice(0, this.currentBatchSize);
      this.isLargeListCapped = this.filteredList.length < this.fullFilteredList.length;
      return;
    }

    this.currentBatchSize = this.fullFilteredList.length;
    this.filteredList = [...this.fullFilteredList];
    this.isLargeListCapped = false;
  }

  private loadNextBatch(): void {
    if (!this.isLargeListCapped) return;
    this.currentBatchSize += this.LARGE_LIST_INITIAL_ITEMS;
    this.filteredList = this.fullFilteredList.slice(0, this.currentBatchSize);
    this.isLargeListCapped = this.filteredList.length < this.fullFilteredList.length;
  }

  private resetSearch(): void {
    this.currentSearchValue = '';
    this.applyDefaultFilteredList();
  }

  // ── Private: panel scroll (large list optimization) ────────────────────────

  private attachPanelScrollListener(): void {
    if (!this.optimizeLargeList) return;

    setTimeout(() => {
      const panel = document.querySelector('.gds-select-panel') as HTMLElement;
      if (!panel || this.panelElement === panel) return;
      this.detachPanelScrollListener();
      this.panelElement = panel;
      this.panelElement.addEventListener('scroll', this.onPanelScroll, { passive: true });
    }, 0);
  }

  private detachPanelScrollListener(): void {
    if (!this.panelElement) return;
    this.panelElement.removeEventListener('scroll', this.onPanelScroll);
    this.panelElement = undefined;
  }

  private onPanelScroll = (event: Event): void => {
    if (!this.isLargeListCapped) return;
    const panel = event.target as HTMLElement;
    const nearBottom =
      panel.scrollTop + panel.clientHeight >= panel.scrollHeight - this.PANEL_BOTTOM_THRESHOLD;
    if (nearBottom) this.loadNextBatch();
  };
}
