import { Directive, OnDestroy, ElementRef, HostListener } from '@angular/core'; 
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMaskPhoneNumber]'
})
export class PhoneMaskDirective implements OnDestroy {
  public mask =  ['(', /[0]/, /[1|5|6|7|9]/, /[0|5|7|1|9]/ , ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];  
  public maskedInputController:any;

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);  
  }

  constructor(private element: ElementRef, public ngControl: NgControl) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask, 
      guide: false
    });
  }

  onInputChange(event, backspace) {
    if(event){
      let newVal = event.replace(/\D/g, '');   
      if (newVal.length === 0) {
        newVal = '';
      }
      else if(newVal.length < 10 && newVal === "07"){
        this.mask.splice(3,1, /[0|7]/)
      }
      else if(newVal.length < 10 && newVal === "05"){
        this.mask.splice(3,1, /[0|1|5]/)
      }
      else if(newVal.length < 10 && newVal === "06"){
        this.mask.splice(3,1, /[0]/)
      }
      else if(newVal.length < 10 && newVal === "01"){
        this.mask.splice(3,1, /[0]/)
      }
      else if(newVal.length < 10 && newVal === "09"){
        this.mask.splice(3,1, /[9]/)
      }
      else if (backspace && newVal.substring(0,2) === "07") {
        this.mask.splice(3,1, /[0|7]/)
        console.log("backspace", newVal)
      }
      else if (backspace && newVal.substring(0,2) === "05") {
        this.mask.splice(3,1, /[0|1|5]/)
        console.log("backspace", newVal)
      }
      else if (backspace && newVal.substring(0,2) === "06") {
        this.mask.splice(3,1, /[0]/)
        console.log("backspace", newVal)
      }
      else if (backspace && newVal.substring(0,2) === "01") {
        this.mask.splice(3,1, /[0]/)
        console.log("backspace", newVal)
      }
      else if (backspace && newVal.substring(0,2) === "09") {
        this.mask.splice(3,1, /[9]/)
        console.log("backspace", newVal)
      }
    } 
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }

}
