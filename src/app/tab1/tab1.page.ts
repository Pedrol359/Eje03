import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks = this.tasksService.getTasksReference();
  public idTask = this.tasksService.getIdTasksReference();
  public task: string;
  constructor(private tasksService: TasksService) {
    this.tasksService.getTasks().subscribe( data =>{
      this.tasks=[];
      this.idTask=[];
      data.forEach((element:any) => {
        const taskObject = {id:element.payload.doc.id ,...element.payload.doc.data()}
        this.tasks.push( taskObject.name || 'nameTaks');
        this.idTask.push(taskObject.id);
        
        // console.log(this.tasks);
        // console.log(this.idTask);
      });
      this.tasksService.setTasks(this.tasks);
      this.tasksService.setTasksId(this.idTask);
      
    });
  }


public addTask(){
    this.tasksService.addTask(this.task);
    this.tasksService.setTasks(this.tasks);
    this.tasksService.setTasksId(this.idTask);
    this.tasks = this.tasksService.getTasksReference();
    this.idTask = this.tasksService.getIdTasksReference()
    this.task='';
    // console.log(this.tasks);
    // console.log(this.idTask);
    
    
  }

  public removeTask(pos: number){
      this.tasksService.removeTask(pos);
      this.tasks = this.tasksService.getTasksReference();
  }

  public completeTask(index:number){
    this.tasksService.addCompletedTask(index);
  }

}
