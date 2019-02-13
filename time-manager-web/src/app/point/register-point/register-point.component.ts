import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/configuration/configuration.service';
import { BankHour } from 'src/app/shared/models/bank-hour.model';
import { Configuration } from 'src/app/shared/models/Configuration.model';
import { RegisterPointService } from './register-point.service';

@Component({
  selector: 'app-register-point',
  templateUrl: './register-point.component.html',
  styleUrls: ['./register-point.component.scss']
})
export class RegisterPointComponent implements OnInit {
  @Output() reloadComponent = new EventEmitter;


  private userID = '5c48ce611debe10818b71b85';
  private configuration: Configuration;

  // TypeScript
  modalRef: BsModalRef;
  registerForm: FormGroup;
  @ViewChild(ModalDirective) modal: ModalDirective;

  // Atributos
  submitted = false;
  bsValue = new Date();
  btnSubmitHelper = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerPointService: RegisterPointService,
    private configurationService: ConfigurationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      _id: '',
      date: [new Date(), Validators.required],
      startJourney: ['00:00', Validators.required],
      pauseJourney: ['00:00', Validators.required],
      backJourney: ['00:00', Validators.required],
      endJourney: ['00:00', Validators.required],
      lack: null,
      userId: this.userID
    });
    this.configurationService.getConfigurationByUser(this.userID)
      .subscribe((config: Configuration) => {
        this.configuration = config;
      });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // FALTA
    if (this.registerForm.value.lack) {
      this.registerForm.patchValue({
        startJourney: '00:00',
        pauseJourney: '00:00',
        backJourney: '00:00',
        endJourney: '00:00',
      });
    }

    // VALIDA FORM
    if (this.registerForm.invalid) {
      return;
    }

    // MongoDB
    if (this.registerForm.value._id.length) {
      this.registerPointService.updateTimeBank(this.registerForm.value)
        .subscribe((queryDB) => {
          this.modal.hide();
          this.reloadComponent.emit(true);
        });
    } else {
      this.registerPointService.createTimeBank(this.registerForm.value)
        .subscribe((queryDB) => {
          this.modal.hide();
          this.reloadComponent.emit(true);
        });
    }

  }

  openModal(data) {
    this.registerForm.patchValue({
      date: data.date,
      _id: '',
      startJourney: '00:00',
      pauseJourney: '00:00',
      backJourney: '00:00',
      endJourney: '00:00',
      lack: false
    });

    if (data._id) {
      this.registerPointService.getTimeBankBy_ID(data._id)
        .subscribe((queryDB: BankHour) => {
          this.registerForm.patchValue({
            _id: data._id,
            startJourney: queryDB.hours.startJourney,
            pauseJourney: queryDB.hours.pauseJourney,
            backJourney: queryDB.hours.backJourney,
            endJourney: queryDB.hours.endJourney,
            lack: queryDB.lack
          });

        });
    }

    this.modal.show();
  }

}
