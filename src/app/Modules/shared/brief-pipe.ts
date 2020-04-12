import {Pipe , PipeTransform} from '@angular/core'

@Pipe({name: 'brief'})
export class BriefPipe implements PipeTransform {
  transform( phrase:string ):string{
    let newPhrase = phrase.substr(0 , 20);
    if( phrase.length > 20 ) newPhrase += "..."

    return newPhrase;
  }
}
