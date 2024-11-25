import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  priority = ['High', 'Medium', 'Low'];

  todoForm = new FormGroup({
    Title: new FormControl(''),
    Description: new FormControl(''),
    Priority: new FormControl(''),
    setDate: new FormControl(new Date().toISOString()),
    startTime: new FormControl(new Date().toISOString()),
    endTime: new FormControl(new Date().toISOString()),
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      console.log('Form Submitted:', this.todoForm.value);
      this.dismissModal();
    } else {
      console.log('Form is invalid');
    }
  }
}

