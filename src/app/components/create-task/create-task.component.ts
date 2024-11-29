import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})

export class CreateTaskComponent implements OnInit {
  priority = ['High', 'Medium', 'Low'];
  currentDate: string = '';
  selectedColor: string | null = null;
  selectedIcon: string = '';

  todoForm = new FormGroup({
    Title: new FormControl(''),
    Description: new FormControl(''),
    priority: new FormControl('priority'),
    setDate: new FormControl(new Date().toISOString()),
    startTime: new FormControl(new Date().toISOString()),
    endTime: new FormControl(new Date().toISOString()),
    Color: new FormControl(''),
    Icon: new FormControl(''),
  });

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private todoService: TodoService
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async presentToast(msg : string){
    const toast = await this.toastCtrl.create({
      message : msg,
      duration : 2000,
      buttons : [{
        side: 'end',
        icon: 'checkmark-circle-outline',
        role: 'cancel'
      }]
    });
    toast.present();
  }

  onColorSelected(color: string): void {
    this.selectedColor = color;
    console.log('Selected color:', this.selectedColor);
  }

  onIconSelected(icon: string): void {
    this.selectedIcon = icon;
    console.log('Selected icon:', this.selectedIcon);
  }

  onSubmit() {
    this.currentDate = (new Date()).toISOString();
    let uid = this.currentDate + this.todoForm.value.Title;

    this.todoForm.value.Color = this.selectedColor;
    this.todoForm.value.Icon = this.selectedIcon;

    this.todoService.addTask(uid, this.todoForm.value).then(data => {
      console.log(data);

      this.presentToast("Task Added Succesfully!");

      this.modalCtrl.dismiss();
    })

    if (this.todoForm.valid) {
      console.log('Form Submitted:', this.todoForm.value);
      this.dismissModal();
    } else {
      console.log('Form is invalid');
    }
  }
}

