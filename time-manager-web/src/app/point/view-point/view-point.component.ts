import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { Configuration } from 'src/app/shared/models/Configuration.model';
import { ViewPointService } from './view-point.service';

@Component({
  selector: 'app-view-point',
  templateUrl: './view-point.component.html',
  styleUrls: ['./view-point.component.scss']
})
export class ViewPointComponent implements OnInit, OnDestroy {
  private userID = '5c48ce611debe10818b71b85';

  // Event
  @Output() openModal = new EventEmitter;

  // TypeScript
  Calendar: any = [];
  configuration: Configuration;
  configurationSubscribe: Subscription;

  // Atribuídos
  DateJS = new Date();
  activeYear = this.DateJS.getUTCFullYear();
  activeMonth = this.DateJS.getMonth();
  today = this.DateJS.getDate();
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  arrayCalendar = [];
  SelectDate = null;
  presentYear = this.DateJS.getUTCFullYear();
  presentMonth = this.DateJS.getMonth();

  // Icons
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  constructor(
    private viewPointService: ViewPointService,
    private configurationService: ConfigurationService
  ) {
    this.configuration = {
      _id: null,
      days: {
        sunday: null,
        monday: null,
        tuesday: null,
        fourth: null,
        fifth: null,
        friday: null,
        saturday: null
      },
      journey: null,
      userId: null
    };
  }

  ngOnDestroy(): void {
    this.configurationSubscribe.unsubscribe();;
  }

  ngOnInit() {
    this.configurationSubscribe = this.configurationService.getConfigurationByUser(this.userID)
      .subscribe((queryData: Configuration) => {
        this.configuration = queryData;
        this.generateCalendar(this.presentYear, this.presentMonth);
      });
  }

  buttonPrevious() {
    this.activeMonth = this.activeMonth - 1;
    if (this.activeMonth < 0) {
      this.activeYear = this.activeYear - 1;
      this.activeMonth = 11;
    }
    this.generateCalendar(this.activeYear, this.activeMonth);
  }

  buttonNext() {
    this.activeMonth = this.activeMonth + 1;
    if (this.activeMonth > 11) {
      this.activeYear = this.activeYear + 1;
      this.activeMonth = 0;
    }
    this.generateCalendar(this.activeYear, this.activeMonth);
  }

  buttonToday() {
    this.activeYear = this.DateJS.getFullYear();
    this.activeMonth = this.DateJS.getMonth();
    this.generateCalendar(this.activeYear, this.activeMonth);
  }

  generateCalendar(Year: number, Month: number): void {
    this.arrayCalendar = [];
    this.Calendar = [];

    const dateSistem = new Date(Year, Month + 1, 0);
    const dateNow = new Date(Year, Month);
    let calendarDaysShown: number = 42;
    let countP: number = 0;

    // [ Gera Calendario ]
    if (dateNow.getDay() > 0) {
      const lastMonth = new Date(Year, Month, 0);
      let auxDay = lastMonth.getDate() - (dateNow.getDay() - 1);
      for (countP; countP < dateNow.getDay(); countP++) {

        this.arrayCalendar[
          (auxDay < 10 ? '0' + auxDay + 1 : auxDay) + '/' +
          (lastMonth.getMonth() < 10 ? '0' + (lastMonth.getMonth() + 1) : (lastMonth.getMonth() + 1)) + '/' +
          lastMonth.getFullYear()
        ] = countP;

        this.Calendar[countP] = {
          balanceHours: '00:00',
          day: auxDay++,
          date: null,
          class: this.viewPointService.configClass(4),
          _id: null
        };
      }
    }

    for (let i = 1; i <= dateSistem.getDate(); i++) {

      let weekDay2 = new Date(Year, Month + 1, 0);
      weekDay2.setDate(i);
      let weekJourney = this.configuration.days[this.viewPointService.weekDay(weekDay2.getDay())];

      let todayLoop = null;

      if (!weekJourney) {
        todayLoop = 3;
      } else {
        if (Year > this.presentYear) {
          todayLoop = 3;
        } else {
          if (Year >= this.presentYear && Month > this.presentMonth) {
            todayLoop = 3;
          } else {
            if (Month == this.presentMonth && this.today < i) {
              todayLoop = 3;
            } else {
              todayLoop = 6;
            }
            if (Year == this.presentYear && Month == this.presentMonth && this.today == i) {
              todayLoop = 5;
            }
          }
        }
      }

      this.arrayCalendar[
        (i < 10 ? '0' + i : i) + '/' +
        ((Month + 1) < 10 ? '0' + (Month + 1) : (Month + 1)) + '/' +
        Year
      ] = countP;

      this.Calendar[countP++] = {
        balanceHours: '00:00',
        day: i,
        date: null,
        class: this.viewPointService.configClass(todayLoop),
        _id: null
      };

    }

    // Aux Array Calendar
    let auxArrayMonth = (Month + 2 > 12 ? 1 : Month + 2);
    let auxArrayYear = (Month + 2 > 12 ? Year + 1 : Year);

    const totCount = calendarDaysShown - countP;
    for (let i = 1; i <= totCount; i++) {

      this.arrayCalendar[
        (i < 10 ? '0' + i : i) + '/' +
        (auxArrayMonth < 10 ? '0' + auxArrayMonth : auxArrayMonth) + '/' +
        auxArrayYear
      ] = countP;

      this.Calendar[countP++] = {
        balanceHours: '00:00',
        day: i,
        date: null,
        class: this.viewPointService.configClass(4),
        _id: null
      };
    }
    // [ /Gera Calendario ]

    //  Date Banco
    if (Year <= this.presentYear) {
      if (Month <= this.presentMonth || Year <= this.presentYear) {

        const MonthView = ((this.activeMonth + 1) < 10 ? '0' + (this.activeMonth + 1) : (this.activeMonth + 1));
        this.viewPointService.getTimeBankByUserAndDate(this.userID, MonthView + '/' + this.activeYear)
          .subscribe((queryDB: any) => {    
            let weekDay = new Date(Year, Month + 1, 0);
            for (let i = 0; i < queryDB.length; i++) {

              let auxDate = queryDB[i].date.split('/');
              weekDay.setDate(auxDate[0]);

              let weekJourney = this.configuration.days[this.viewPointService.weekDay(weekDay.getDay())];
              if (weekJourney) {

                if (this.arrayCalendar[queryDB[i].date]) {
                  this.Calendar[this.arrayCalendar[queryDB[i].date]] = {
                    balanceHours: queryDB[i].balanceHours,
                    day: this.Calendar[this.arrayCalendar[queryDB[i].date]].day,
                    date: queryDB[i].date,
                    class: this.viewPointService.configClass((parseInt(queryDB[i].balanceHours) >= 0 ? 1 : 2)),
                    _id: queryDB[i]._id
                  };
                }

              }
            }
          });
      }
    }

  }

  disparaEvento(event, day, typeClass, _id) {
    if (typeClass == "desativadoMes" || typeClass == 'desativado') {
      event.stopPropagation();
    } else {
      this.SelectDate = {
        date: new Date(this.activeYear, this.activeMonth, day),
        _id: _id
      }
      this.openModal.emit();
    }
  }

  reaload() {
    this.configurationSubscribe = this.configurationService.getConfigurationByUser(this.userID)
      .subscribe((queryData: Configuration) => {
        this.configuration = queryData;
        this.generateCalendar(this.presentYear, this.presentMonth);
      });
  }

}
