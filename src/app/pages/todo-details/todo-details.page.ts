import { Component, OnInit } from '@angular/core';
import { TaskI } from "../../models/task.interface";
import { SubjectI } from "../../models/subject.interface";
import { TodoService } from "../../services/todo.service";
import { SubjectService } from "../../services/subject.service";
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  
  subjects: SubjectI[];
  
  private todo: TaskI = {
    task: '',
    priority: 0,
    createdAt: new Date().getTime(),
    description: '',     
    subject: ''
  };
  private subjectTodo: SubjectI = {
    id: '',
    nombre: '',
    periodo: 0
  };
  todoId = null;

  constructor(
    private route: ActivatedRoute, private nav: NavController,
    private todoService: TodoService, private subjectService: SubjectService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {  }

  ngOnInit() {
    this.loadSubjects();
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
      //console.log(this.todoId);
    }
  }

  
  doRefresh(event) {
    this.loadSubjects()
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async loadSubjects() {
    const loading = await this.loadingController.create({
      message: 'Cargando materias....'
    });
    await loading.present();
    this.subjectService.getSubjects().subscribe(resp =>  {
      loading.dismiss();
      this.subjects = resp;
    });
  }

  // ionViewWillEnter(){
  //   this.loadSubjects()
  //   console.log("Will enter")
  // }

  getSubject(subjectId){
    this.subjectService.getSubject(subjectId).subscribe(res =>{
      this.subjectTodo = res;
      console.log(res);
    });
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Cargando....'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
      //console.log(res);
    })
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Guardando....'
    });
    await loading.present();

    if (this.todoId) {
      //UPDATE
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      })
    } else {
      //INSERT
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  async onRemove(todoId: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: '¿Está seguro de <strong>eliminar</strong> la tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Si',
          handler: () => {
            this.todoService.removeTodo(todoId);
           // this.nav.navigateForward('/');
          }
        }
      ]
    });
    await alert.present();
  }
}
