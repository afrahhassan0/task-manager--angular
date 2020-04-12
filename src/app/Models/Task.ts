import { Status } from './Status';
import { Checklist } from './Checklist';

export class Task{
  constructor(
    public taskId:number,
    public title: string,
    public deadline: string,
    public status: Status,
    public checklists: Checklist[] =[],
    public description?: string,
  ){}


}
