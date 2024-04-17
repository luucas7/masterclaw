import { AxiosCustomAuthResponse } from '../ts/axios';
import { sha256 } from 'js-sha256';
import { FormInputFormat, FormValidationResult, FormValidator } from '../ts/form';
import axios from 'axios';
import { HOST } from '../config';
import { OutputContent } from '../ts/output';

const FormInputValidation = (values: FormInputFormat): FormValidationResult => {
    return new FormValidator().validateInputs(values);
}

export const authentification = async ({username, password, email, path, navigate, signIn, showOutput, gotError}: {
    username: string,
    password: string,
    email?: string,
    path: string,
    navigate: (path: string) => void,
    signIn: (data: { auth: { token: string; type: string; }; userState: { name: string; uuid: string; }; }) => boolean,
    showOutput: (content: OutputContent) => void,
    gotError: (error: boolean) => void
}): Promise<void> => {

    const finalResult = FormInputValidation({ username: username, password: password, email: email});
        
    console.log(finalResult);
    
        if (!finalResult.result) {            
            showOutput({ message: 'An error occured, Code : E106', type: 'error' });
            gotError(true);
            return;
        }

        finalResult.values.password = sha256(finalResult.values.password);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = (await axios.post<any, AxiosCustomAuthResponse>(`${HOST}/auth/${path}`, finalResult.values)).data;
                
            console.log(response);
            switch (response.status) {

                case 'success':
                    console.log(response.jwt.token, response.jwt.tokenType, response.user.username, response.user.uuid);
                    
                    if (!signIn({
                        auth: {
                            token: response.jwt.token,
                            type: response.jwt.tokenType,

                        },
                        userState: { name: response.user.username, uuid: response.user.uuid },
                    })) { showOutput({ message: 'An error occured, Code : E109', type: 'error' }); return; }

                    navigate('/');
                    // TODO Listening on possible fix for this
                    window.location.reload();

                    showOutput({ message: response.message, type: 'success' });
                    break;
                default:
                    showOutput({ message: response.message, type: 'error' });
                    gotError(true);
                    break;
            }

        } catch (err) {
            showOutput({ message: "An error occured, Code : E110", type: 'error' });
            gotError(true);
        }
}