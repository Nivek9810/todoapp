import { Component, OnInit } from '@angular/core';
import { TaskI } from "../models/task.interface";
import { TodoService } from "../services/todo.service";
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController } from "@ionic/angular";
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: TaskI[];

  constructor(
    private todoService: TodoService,
    private router: Router,
    private faio: FingerprintAIO,
    public alertController: AlertController,
    private device: Device,
  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => { this.todos = res });
  }

  openDetailsInLab() {

  }

  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  showFingerprintDialog(todo_id: string) {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    }).then(() => { this.router.navigate(['tabs/home/details', todo_id]) }
    ).catch(
      (error: any) => {
        // Validamos si es un escritorio
        if (!this.device.cordova && !this.device.platform)
          this.router.navigate(['tabs/home/details', todo_id])
        else
          this.presentAlert("Lo siento, su dispositivo no cuenta con detector de huella o no está activo.", error)
      }
    );
  }

  async presentAlert(messageAlert: string, errorM: string) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: errorM,
      message: messageAlert,
      buttons: ['OK']
    });

    await alert.present();
  }
}
