import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCheck, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Configuration } from '../shared/models/Configuration.model';
import { ConfigurationService } from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  private userID = '5c48ce611debe10818b71b85';

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
    { label: 'Fourth', value: false },
    { label: 'Fifth', value: false },
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
        fourth: null,
        fifth: null,
        friday: null,
        saturday: null
      },
      journey: null,
      userId: null
    };
  }

  ngOnInit() {
    this.startComponentData();
  }

  // inicia os dados do component
  startComponentData() {
    // From validate
    this.registerForm = this.formBuilder.group({
      journey: ['', Validators.required]
    });

    // Get dados do usuario
    this.configurationService
      .getConfigurationByUser(this.userID)
      .subscribe((query: any) => {
        if (query) {
          this.configuration = query;
          this.registerForm.patchValue({
            journey: query.journey
          });

          for (let i = 0; i < this.days.length; i++) {
            this.days[i].value = query.days[this.days[i].label.toLowerCase()];
          }
        }
      });
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
    if (this.configuration._id) {
      this.configuration.journey = this.registerForm.value['journey'].toString();
      this.configurationService.updateConfiguration(this.configuration._id, this.configuration)
        .subscribe((apiResult) => {
          console.log(apiResult);
        });
    } else {

      this.configuration.journey = this.registerForm.value['journey'].toString();
      this.configuration.userId = this.userID;

      console.log(this.configuration);
      this.configurationService.createConfiguration(this.configuration)
        .subscribe((apiResult) => {
          console.log(apiResult);
        });
    }
  }
}
