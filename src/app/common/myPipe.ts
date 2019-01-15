import { Pipe, PipeTransform } from '@angular/core';

//Pipe to display Strings like was asked in the assigment
@Pipe({
    name: 'myPipe'
  })
  export class myPipe implements PipeTransform {

    transform(value: string): string {
      let newVal = value.replace(/[^\w\s]/gi, '').toLocaleLowerCase();
      return this.titleCase(newVal);
    }
    titleCase(str) {
     var splitStr = str.toLowerCase().split(' ');
     for (var i = 0; i < splitStr.length; i++) {    
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
     }
     return splitStr.join(' '); 
  }
}