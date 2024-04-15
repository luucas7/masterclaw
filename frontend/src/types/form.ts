

export interface FormInputFormat {
    username: string;
    password: string;
    email?: string;
}


export interface FormInputValidation{
    validateUsername: (username: string) =>  string;
    validatePassword: (password: string) =>  string;
    validateEmail: (email: string) =>  string;
}

export interface FormValidationResult {
    messages: FormInputFormat;
    result: boolean;
    values: FormInputFormat;
}


export class FormValidator implements FormInputValidation{


    static readonly usernameRegex = new RegExp('^[a-zA-Z0-9._-]{3,20}$');
    static readonly passwordRegex = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,20}$');
    static readonly emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    public constructor() {
    }

    validateInputs(values : FormInputFormat): FormValidationResult {
        
        console.log(values);
        
        const username = this.validateUsername(values.username);
        const password = this.validatePassword(values.password);
        let email = 'ok';
        if (values.email) email = this.validateEmail(values.email);
        

        return {
            messages: {
                username: username ,
                password: password,
                email: email
            },
            result: username === 'ok' && password === 'ok' && email === 'ok',
            values: values
        }

    }

    validateUsername(username: string): string {        

        if (username.length < 3 || username.length > 20) return 'Username must be between 3 and 20 characters long.';


        return FormValidator.usernameRegex.test(username) ? 'ok' : 'Invalid username.';
    }

    validatePassword(password: string): string {

        if (password.length < 6 || password.length > 20) return 'Password must be between 6 and 20 characters long.';


        return FormValidator.passwordRegex.test(password) ? 'ok' : 'Invalid password.';
    }

    validateEmail(email: string): string {
        return FormValidator.emailRegex.test(email) ? 'ok' : 'Invalid email.';
    }
}