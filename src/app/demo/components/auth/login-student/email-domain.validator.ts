import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.value;
        if (email && email.indexOf('@') !== -1) {
            const [_, domainName] = email.split('@');
            if (domainName !== domain) {
                return { emailDomain: true };
            }
        }
        return null;
    };
}
