import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor( @Attribute('validateEqual') public validateEqual: string) {}
    
    validate(control: AbstractControl): { [key: string]: any } {
        let vdev = null;
        // self value (e.g. retype password)
        let password_repe = control.value; //esta es la contraseña repe
        // control value (e.g. password)
        let password_orginal = control.root.get(this.validateEqual).value;//cojes el valor de queal, q referencia al otro objeto

        console.log ("Pasa por el validador");
        console.log ("e = " + password_orginal);
        console.log ("v = " + password_repe);
        if (!(password_orginal === password_repe)) {
            vdev = {
                validateEqual: false
            };
        }
        return vdev;
    }
}