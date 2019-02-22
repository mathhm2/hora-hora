import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Configuration } from '../shared/models/Configuration.model';
import { ConfigurationService } from './configuration.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  private dataLogin = JSON.parse(localStorage.getItem('currentUser'));
  private userID = this.dataLogin.user._id;
  private configurationType = false;
  loading = false;

  // TypeScript
  registerForm: FormGroup;
  configuration: Configuration;

  // Icons
  faCheck = faCheck;
  faInfoCircle = faInfoCircle;

  // Atributos
  submitted = false;
  daysSubmitted = false;
  days = [
    { label: 'Sunday', value: false },
    { label: 'Monday', value: false },
    { label: 'Tuesday', value: false },
    { label: 'wednesday', value: false },
    { label: 'thursday', value: false },
    { label: 'Friday', value: false },
    { label: 'Saturday', value: false }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private configurationService: ConfigurationService
  ) {
    this.configuration = {
      _id: null,
      days: {
        sunday: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null
      },
      journey: null,
      userId: null
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      journey: ['', Validators.required]
    });
    this.startComponentData();
  }

  startComponentData() {
    this.configurationService.getConfigurationByUser(this.userID)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.configurationType = true;
            this.registerForm.patchValue({
              journey: data['journey']
            });
            for (let i = 0; i < this.days.length; i++) {
              this.days[i].value = (data['days'][this.days[i].label.toLowerCase().toString()] ? true : false);
              this.configuration.days[this.days[i].label.toLowerCase().toString()] = (data['days'][this.days[i].label.toLowerCase().toString()] ? true : false);
            }
            this.configuration._id = data['_id'];
            this.configuration.journey = data['journey'];
            this.configuration.userId = this.userID;
          }
        },
        error => {
          alert('Erro - console');
          console.log('Error -', error);
        }
      );
  }

  // Ativa os dias da semana BTN[ Check ]
  buttonDays(index) {
    this.daysSubmitted = false;
    this.days[index].value = !this.days[index].value;
    this.configuration.days[this.days[index].label.toLowerCase()] = this.days[index].value;
  }

  // Verifica se escolheu algum dia da semana
  checkDayWeek() {
    let aux = true;
    for (let i = 0; i < this.days.length; i++) {
      if (this.days[i].value) {
        aux = false;
      }
    }
    return aux;
  }

  get f() { return this.registerForm.controls; }

  // Envia os dados para o banco
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) { return; }

    // stop here if form week invalid
    if (this.checkDayWeek()) { this.daysSubmitted = true; return; }

    // Verifica se e update / create com base _id configuration
    if (this.configurationType) {
      this.configuration.journey = this.registerForm.value['journey'].toString();
      this.configurationService.updateConfiguration(this.configuration._id, this.configuration)
        .pipe(first())
        .subscribe(
          data => {
            alert('Alterado com sucesso');
            this.startComponentData();
          },
          error => {
            alert('Erro - console');
            console.log('Error: ', error);
          }
        );
    } else {
      this.configuration.journey = this.registerForm.value['journey'].toString();
      this.configuration.userId = this.userID;
      this.configurationService.createConfiguration(this.configuration)
        .pipe(first())
        .subscribe(
          data => {
            alert('Cadastrado com sucesso');
            this.startComponentData();
          },
          error => {
            alert('Error - console');
            console.log('Error: ', error);
          }
        );
    }
  }
}
