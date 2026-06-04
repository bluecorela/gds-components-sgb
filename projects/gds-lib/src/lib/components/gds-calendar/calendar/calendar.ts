import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

type CalendarView = 'days' | 'months' | 'years';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  standalone: false
})
export class Calendar {
  @ViewChild('calendarDates') set calendarContainer(element: ElementRef<HTMLDivElement> | undefined) {
    element ? this.renderCalendarDays(
      this.selectedMonth ? this.selectedMonth : this.currentMonth, 
      this.selectedYear ? this.selectedYear : this.currentYear
    ) : this.daysController$?.abort();
  }
  @ViewChild('calendarYears') set calendarYears(element: ElementRef<HTMLDivElement> | undefined) {
    element ? this.renderCalendarYears(
      this.selectedYear ? this.selectedYear : this.currentYear
    ) : this.yearsController$?.abort();
  }
  @ViewChild('calendarMonths') set calendarMonths(element: ElementRef<HTMLDivElement> | undefined) {
    element ? this.renderCalendarMonths() : this.monthsController$?.abort();
  }
  public currentView = signal<CalendarView>('days');
  public calendarElements = signal<any[]>([]);
  private daysController$? :AbortController;
  private monthsController$? :AbortController;
  private yearsController$? :AbortController;
  private readonly currentDate: Date = new Date();
  private readonly currentMonth: number = this.currentDate.getMonth();
  private readonly currentYear: number = this.currentDate.getFullYear();
  private readonly currentDay: number = this.currentDate.getDate();

  private selectedDay: number | null = null;
  private selectedMonth: number | null = null;
  private selectedYear: number | null = null;

  public months: string[] = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
  ];

  public isOpen: boolean = false;

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

  ngOnInit(): void {}

  public renderCalendarDays(month: number, year: number, render: boolean = true): void {
    const calendarDays = document.getElementById('calendar-days');
    const calendarTitle = document.getElementById('calendar-title');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDays!.innerHTML = '';
    this.selectedMonth = month;
    this.selectedYear = year;
    console.log('mas ano', `${month} ${year}`)
    calendarTitle!.textContent = `${this.months[month]} ${year}`;

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      calendarDays?.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.classList.add('day');
      cell.textContent = day.toString();
      cell.setAttribute('data-day', day.toString());
      if (
        day === this.currentDay && month === this.currentMonth 
        && year === this.currentYear && day !== this.selectedDay
      ) cell.classList.add('today');
      if (
        day === this.selectedDay
      ) cell.classList.add('selected')
      calendarDays?.appendChild(cell);
    }
    this.daysController$ = new AbortController();
    render && (this.selectDay(), this.changeDays());
  }

  private selectDay(): void {
    const calendarDates = document.getElementById('calendar-days');
    calendarDates?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('day')) {
        this.selectedDay = Number(target.getAttribute('data-day'));
        calendarDates.querySelectorAll('.day').forEach(
          (cell) => cell.classList.remove('selected')
        );
        target?.classList.add('selected');
        // this.isOpen = false;
      }
    }, { signal: this.daysController$?.signal });
  }

  private changeDays(): void {
    const prev = document.getElementById('prev-view');
    const next = document.getElementById('next-view');
    let currentMonth = this.selectedMonth as number;
    let currentYear = this.selectedYear as number;
    prev?.addEventListener('click', () => {
      console.log('prev');
      currentMonth--;
      currentMonth < 0 && (currentMonth = 11, currentYear--);
      this.renderCalendarDays(currentMonth, currentYear, false);
    }, { signal: this.daysController$?.signal });

    next?.addEventListener('click', () => {
      console.log('next');
      currentMonth++;
      currentMonth > 11 && (currentMonth = 0, currentYear++);
      this.renderCalendarDays(currentMonth, currentYear, false);
    }, { signal: this.daysController$?.signal });
  }

  /**
   * Renderiza la vista calendario
   */
  private renderCalendarMonths(): void {
    const calendarMonths = document.getElementById('calendar-months');
    const calendarTitle = document.getElementById('calendar-title');
    this.months.forEach((month, index) => {
      const cell = document.createElement('div');
      cell.classList.add('month');
      cell.setAttribute('data-month', month.toString());
      cell.setAttribute('num-month', index.toString());
      if (index === this.currentMonth) cell.classList.add('today');
      cell.textContent = month;
      calendarMonths?.appendChild(cell);
    });
    calendarTitle!.textContent = `${this.selectedYear}`;
    this.monthsController$ = new AbortController();
    this.selectMonth();
    this.changeMonth();
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
        selectedMonth && (this.selectedMonth = Number(numMonth), setTimeout(() => {
          this.currentView.set('days');
        }, 300));
      }
    }, { signal: this.monthsController$?.signal });
  }

  private changeMonth(): void {
    const next = document.getElementById('next-view');
    const prev = document.getElementById('prev-view');
    const calendarTitle = document.getElementById('calendar-title');
    let year: number = this.selectedYear as number;

    next?.addEventListener('click', () => {
      year = year + 1;
      this.selectedYear = year;
      calendarTitle!.textContent = `${this.selectedYear}`;
    }, { signal: this.monthsController$?.signal });

    prev?.addEventListener('click', () => {
      year = year - 1;
      this.selectedYear = year;
      calendarTitle!.textContent = `${this.selectedYear}`;
    }, { signal: this.monthsController$?.signal });
  }

  private renderCalendarYears(year: number, render: boolean = true): void {
    const calendarYears = document.getElementById('calendar-years');
    calendarYears!.innerHTML = '';
    render && (this.selectedYear = year);
    const startYear = Math.floor(year / 24) * 24;
    for (let y = 0; y < 24; y++) {
      const cell = document.createElement('div');
      cell.classList.add('year');
      cell.setAttribute('data-year', (startYear + y).toString());
      cell.textContent = (startYear + y).toString();
      if (y === year) cell.classList.add('today');
      calendarYears?.appendChild(cell)
    }
    const monthYear = document.getElementById('calendar-title');
    monthYear!.textContent = `${startYear} - ${startYear + 24}`;
    this.yearsController$ = new AbortController();
    render && (this.selectYear(), this.changeYear());
  }

  private selectYear(): void {
    const calendarYears = document.getElementById('calendar-years');
    calendarYears?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('year')) {
        const selectedYear = target.getAttribute('data-year');
        console.log('year', selectedYear);
        calendarYears.querySelectorAll('.year').forEach(
          (cell) => cell.classList.remove('selected')
        );
        target?.classList.add('selected');
        selectedYear && (this.selectedYear = Number(selectedYear), setTimeout(() => {
          this.currentView.set('months');
        }, 300));
      }
    }, { signal: this.yearsController$?.signal });
  }

  private changeYear(): void {
    const next = document.getElementById('next-view');
    const prev = document.getElementById('prev-view');
    let currentYear: number = this.selectedYear as number;

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
    const date = `${this.selectedDay} ${this.selectedMonth} ${this.selectedYear}`;
    console.log('date', date);
  }

  public cancel(): void {
    console.log('cancel');
  }

}
