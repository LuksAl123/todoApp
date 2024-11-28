import { Component } from '@angular/core';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(private modalCtrl : ModalController) {}

  async addTask(){
    debugger
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true
    })

    return await modal.present();
  }
}
