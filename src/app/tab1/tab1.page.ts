import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: string[];
  public task: string;
  constructor(private tasksService: TasksService) {
    this.tasks = this.tasksService.getTasks();
  }
public addTask(){
    this.tasksService.addTask(this.task);
    this.tasks = this.tasksService.getTasks();
    this.task='';
    console.log(this.tasks);
  }

  public removeTask(pos: number){
      this.tasksService.removeTask(pos);
      this.tasks = this.tasksService.getTasks();
  }

  public completeTask(index:number){
    this.tasksService.addCompletedTask(index);
  }
}
