import { Component, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

type CalendarView = 'days' | 'months' | 'years';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  standalone: false
})
export class Calendar {
  @ViewChild('calendarDates') set calendarContainer(element: ElementRef<HTMLDivElement> | undefined) {
    if (element) {
      this.daysController$ = new AbortController();
      this.renderCalendarDays(
        this.selectedDay$.getValue() ?? this.currentDay,
        this.selectedMonth$.getValue() ?? this.currentMonth, 
        this.selectedYear$.getValue() ?? this.currentYear
      );
    } else {
      this.daysController$?.abort();
    }
  }
  @ViewChild('calendarMonths') set calendarMonths(element: ElementRef<HTMLDivElement> | undefined) {
    if (element) {
      this.monthsController$ = new AbortController();
      this.renderCalendarMonths(this.selectedYear$.getValue() as number);
    } else {
      this.monthsController$?.abort();
    }
  }
  @ViewChild('calendarYears') set calendarYears(element: ElementRef<HTMLDivElement> | undefined) {
    if (element) {
      this.yearsController$ = new AbortController();
      this.renderCalendarYears(
        this.selectedYear$.getValue() ?? this.currentYear
      );
    } else {
      this.yearsController$?.abort();
    }
  }
  @Output() date = new EventEmitter<any>();
  @Output() exit = new EventEmitter<any>();
  public currentView = signal<CalendarView>('days');
  public calendarElements = signal<any[]>([]);

  private selectedYear$ = new BehaviorSubject<number | null>(null);
  private selectedMonth$ = new BehaviorSubject<number | null>(null);
  private selectedDay$ = new BehaviorSubject<number | null>(null);
  public isDateComplete$!: Observable<boolean>;

  private daysController$? :AbortController;
  private monthsController$? :AbortController;
  private yearsController$? :AbortController;
  private readonly currentDate: Date = new Date();
  private readonly currentMonth: number = this.currentDate.getMonth();
  private readonly currentYear: number = this.currentDate.getFullYear();
  private readonly currentDay: number = this.currentDate.getDate();

  private changeDayMonth?: number | null;
  private changeDayYear?: number | null;

  public months: string[] = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];

  constructor(
    domSanitizer: DomSanitizer,
    matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry
      .addSvgIcon('chevron_izquierda', domSanitizer.bypassSecurityTrustResourceUrl(`assets/chevron_izquierda.svg`))
      .addSvgIcon('chevron_derecha', domSanitizer.bypassSecurityTrustResourceUrl(`assets/chevron_derecha.svg`))
      .addSvgIcon('chevron_abajo', domSanitizer.bypassSecurityTrustResourceUrl(`assets/chevron_abajo.svg`))
      .addSvgIcon('chevron_arriba', domSanitizer.bypassSecurityTrustResourceUrl(`assets/chevron_arriba.svg`));
  }

  ngOnInit(): void {
    this.isDateComplete$ = combineLatest([
      this.selectedYear$,
      this.selectedMonth$,
      this.selectedDay$
    ]).pipe(
      map(([year, month, day]) => {
        return !(year && (typeof month === 'number' || month) && day); 
      })
    );
  }

  public renderCalendarDays(day: number, month: number, year: number, render: boolean = true): void {
    const calendarDays = document.getElementById('calendar-days');
    const calendarTitle = document.getElementById('calendar-title');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDays!.innerHTML = '';
    if (
      day === this.currentDay
      && month === this.currentMonth
      && year === this.currentYear
    ) {
      render && this.selectedDay$.next(day);
    }
    render && this.selectedMonth$.next(month);
    render && this.selectedYear$.next(year);

    calendarTitle!.textContent = `${this.months[month]} ${year}`;

    // carga las casillas vacias
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendarDays?.appendChild(emptyCell);
    }

    // carga las casillas de los dias
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.classList.add('day');
      cell.textContent = day.toString();
      cell.setAttribute('data-day', day.toString());

      if (
        day === this.currentDay 
        && month === this.currentMonth 
        && year === this.currentYear
      ) cell.classList.add('today');

      if (
        day !== this.currentDay
        && day === this.selectedDay$.getValue()
        && month === this.selectedMonth$.getValue()
        && year === this.selectedYear$.getValue()
      ) cell.classList.add('selected');

      calendarDays?.appendChild(cell);
    }
    render && (this.selectDay(), this.changeDays());
  }

  private selectDay(): void {
    const calendarDates = document.getElementById('calendar-days');
    calendarDates?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('day')) {
        this.selectedDay$.next(Number(target.getAttribute('data-day')));
        this.changeDayMonth && this.selectedMonth$.next(this.changeDayMonth as number);
        this.changeDayYear && this.selectedYear$.next(this.changeDayYear as number);
        calendarDates.querySelectorAll('.day').forEach(
          (cell) => cell.classList.remove('selected')
        );
        target?.classList.add('selected');
        this.changeDayMonth = null;
        this.changeDayYear = null;
      }
    }, { signal: this.daysController$?.signal });
  }

  private changeDays(): void {
    const prev = document.getElementById('prev-view');
    const next = document.getElementById('next-view');

    let currentMonth = this.selectedMonth$.getValue() as number;
    let currentYear = this.selectedYear$.getValue() as number;
    let currentDay = this.selectedDay$.getValue() as number;

    prev?.addEventListener('click', () => {
      currentMonth--;
      currentMonth < 0 && (currentMonth = 11, currentYear--);
      this.changeDayMonth = currentMonth;
      this.changeDayYear = currentYear;
      this.renderCalendarDays(currentDay, currentMonth, currentYear, false);
    }, { signal: this.daysController$?.signal });

    next?.addEventListener('click', () => {
      currentMonth++;
      currentMonth > 11 && (currentMonth = 0, currentYear++);
      this.changeDayMonth = currentMonth;
      this.changeDayYear = currentYear;
      this.renderCalendarDays(currentDay, currentMonth, currentYear, false);
    }, { signal: this.daysController$?.signal });
  }

  /**
   * Renderiza la vista calendario
   */
  private renderCalendarMonths(selectYear: number, render: boolean = true): void {
    const calendarMonths = document.getElementById('calendar-months');
    const calendarTitle = document.getElementById('calendar-title');
    calendarMonths!.innerHTML = '';
    this.months.forEach((month, index) => {
      const cell = document.createElement('div');
      cell.classList.add('month');
      cell.setAttribute('data-month', month.toString());
      cell.setAttribute('num-month', index.toString());
      if (index === this.currentMonth && selectYear === this.currentYear) cell.classList.add('today');
      cell.textContent = month;
      calendarMonths?.appendChild(cell);
    });
    calendarTitle!.textContent = `${selectYear}`;
    render && (this.selectMonth(), this.changeMonth());
  }

  /**
   * Listener para selecionar el mes
   */
  private selectMonth(): void {
    const calendarMonths = document.getElementById('calendar-months');
    calendarMonths?.addEventListener('click', (element) => {
      const target = element.target as HTMLElement;
      if (target.classList.contains('month')) {
        const selectedMonth = target.getAttribute('data-month');
        const numMonth = target.getAttribute('num-month');
        calendarMonths.querySelectorAll('.month').forEach(
          (cell) => cell.classList.remove('selected')
        );
        target?.classList.add('selected');
        selectedMonth && (this.selectedMonth$.next(Number(numMonth)), setTimeout(() => {
          this.selectedDay$.next(null);
          this.currentView.set('days');
        }, 300));
      }
    }, { signal: this.monthsController$?.signal });
  }

  private changeMonth(): void {
    const next = document.getElementById('next-view');
    const prev = document.getElementById('prev-view');
    let year: number = this.selectedYear$.getValue() as number;

    next?.addEventListener('click', () => {
      year = year + 1;
      this.renderCalendarMonths(year, false);
    }, { signal: this.monthsController$?.signal });

    prev?.addEventListener('click', () => {
      year = year - 1;
      this.renderCalendarMonths(year, false);
    }, { signal: this.monthsController$?.signal });
  }

  private renderCalendarYears(year: number, render: boolean = true): void {
    const calendarYears = document.getElementById('calendar-years');
    calendarYears!.innerHTML = '';
    render && (this.selectedYear$.next(year));
    const startYear = Math.floor(year / 24) * 24;
    for (let y = 0; y < 24; y++) {
      const cell = document.createElement('div');
      cell.classList.add('year');
      cell.setAttribute('data-year', (startYear + y).toString());
      cell.textContent = (startYear + y).toString();
      if ((startYear + y) === this.currentYear) cell.classList.add('today');
      calendarYears?.appendChild(cell)
    }
    const monthYear = document.getElementById('calendar-title');
    monthYear!.textContent = `${startYear} - ${startYear + 24}`;
    render && (this.selectYear(), this.changeYear());
  }

  private selectYear(): void {
    const calendarYears = document.getElementById('calendar-years');
    calendarYears?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('year')) {
        const selectedYear = target.getAttribute('data-year');
        calendarYears.querySelectorAll('.year').forEach(
          (cell) => cell.classList.remove('selected')
        );
        target?.classList.add('selected');
        selectedYear && (this.selectedYear$.next(Number(selectedYear)), setTimeout(() => {
          this.currentView.set('months');
        }, 300));
      }
    }, { signal: this.yearsController$?.signal });
  }

  private changeYear(): void {
    const next = document.getElementById('next-view');
    const prev = document.getElementById('prev-view');
    let currentYear: number = this.selectedYear$.getValue() as number;

    next?.addEventListener('click', () => {
      currentYear = currentYear + 24;
      this.renderCalendarYears(currentYear, false);
    }, { signal: this.yearsController$?.signal });

    prev?.addEventListener('click', () => {
      currentYear = currentYear - 24;
      this.renderCalendarYears(currentYear, false);
    }, { signal: this.yearsController$?.signal });
  }

  public accept(): void {
    const year: number = this.selectedYear$.getValue() as number;
    const month: number = this.selectedMonth$.getValue() as number;
    const day: number = this.selectedDay$.getValue() as number;
    const date = new Date(year, month, day);
    this.date.emit(date);
  }

  public cancel(): void {
    this.exit.emit();
  }
}
