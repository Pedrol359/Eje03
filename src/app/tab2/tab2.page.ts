import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public tasksCompleted: string[];
  public task: string;
  constructor(private tasksService: TasksService) {
    this.tasksCompleted = this.tasksService.getTasksCompleted();
  }

  public addTask(index:number){
    this.tasksService.addTask(this.tasksCompleted[index]);
    this.removeTaskCompleted(index);
  }

  public removeTaskCompleted(pos: number){
      this.tasksService.removeTaskCompleted(pos);
      this.tasksCompleted = this.tasksService.getTasksCompleted();
  }
}
