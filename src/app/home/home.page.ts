import { Component } from '@angular/core';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private todoService: TodoService,
    private datePipe: DatePipe
  ) {
    this.loadData();
  }

convertDateTimetoTime(dateTimeValue : any): string {
  if(dateTimeValue) !== null) {

    return this.datePipe.transform(dateTimeValue, 'hh.mm' || '');
  }
  return '';
}

  loadData() {
    this.todoService.getAllTask().then((val: any[]) => {
      this.todoList = val;
    });
  }

    calculateTimeDifference(startDateTime:string, endDateTime: string): string{
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return 'invalid date format';
      }

      const timeDifferenceMs = endDate.getTime() - startDate.getTime();

      const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      const minutes = Math.floor(timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60);

      if (hours > 0){
        return `${hours}hr`;
      }
      else if(minutes > 0){
        return `${minutes}min`;
      }
      else {
        return '0 min';
      }
    }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
    });

    return await modal.present();
  }
}
