import { Task } from './Task';
import { Checklist } from './Checklist';
import { Status } from './Status';

export class SharedTask extends Task{
  constructor(
    public TaskId:number,
    public title: string,
    public createdDate: string,
    public status: Status,
    public adminComments: string[] =[],
    public deadline: string,
    public checklists: Checklist[] =[],
    public description?: string,
  ){
    super( TaskId , title , createdDate, status, checklists, description);
  }
}
