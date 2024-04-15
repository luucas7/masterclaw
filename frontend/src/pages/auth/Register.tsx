/* eslint-disable no-useless-catch */
import "../../style/compiled/form.css";
import { HOST } from "../../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useReducer } from "react";
import { AxiosCustomResponse } from "../../types/axios";
import { sha256 } from "js-sha256";
import { FormInputFormat, FormValidationResult, FormValidator } from "../../types/form";
import useSignIn from "react-auth-kit/hooks/useSignIn";


const FormInputValidation = (values: FormInputFormat): FormValidationResult => {
   return new FormValidator().validateInputs(values);
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'username':
            return { ...state, username: action.value };
        case 'password':
            return { ...state, password: action.value };
        case 'email':
            return { ...state, email: action.value };
        default:
            return state;
    }

}


const Register = () => {

    const navigate = useNavigate();

    const signIn = useSignIn(); 

    const [state, dispatch] = useReducer(reducer, { username: '', password: '', email: '' });

    const onDispatch = (type: string, value: string) => {
        dispatch({ type: type, value: value });
    }


    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const finalResult = FormInputValidation({ username: state.username, password: state.password, email: state.email});
        
        if (finalResult.result){

            finalResult.values.password = sha256(finalResult.values.password);

            try {
                const response = await axios.post<AxiosCustomResponse>(`${HOST}/auth/register`, finalResult.values);

                signIn({
                    auth: {
                        token: response.token,
                        type: "Bearer",
                    }
                });
                navigate('/');

            } catch (err) {
                console.error(err);
            }


        } else {
            //TODO: Display error messages
            console.log(finalResult.messages);
        }
        
    };

    return (
        <>
            <div className="page-body flexbox">

            <Grid container display={"flex"} className="flexbox justify-center">
                <Grid item lg={4} md={5} sm={6} xs={7}>
                        <Box className="luucky-form-container" >
                            <p className="luucky-title">Register</p>
                            <Box className="luucky-form" component={'form'} autoComplete="on" onSubmit={onSubmit} >
                                <div className="luucky-input-group">
                                    <TextField id="name" label="Name" variant="outlined" value={state.username} onChange={(e) => { onDispatch('username', e.target.value)}}
                                    required type="text" margin="normal" fullWidth autoFocus/>
                                </div>

                                <div className="luucky-input-group">
                                    <TextField id="email" label="Email" variant="outlined" value={state.email} onChange={(e) => { onDispatch('email', e.target.value)}}
                                    required type="email" margin="normal" fullWidth />
                                </div>

                                <div className="luucky-input-group">
                                    <TextField id="password" label="Password" variant="outlined" value={state.password} onChange={(e) => { onDispatch('password', e.target.value)}}
                                    required type="password" margin="normal" fullWidth />
                                </div>

                                <input type="submit" value="Register" id="submit" className="luucky-submit"  />
                            </Box>

                            <div className="luucky-social-message">
                                <div className="luucky-line"></div>
                            </div>

                            <p className="luucky-signup">
                                You have an account ?&nbsp;
                                <Link to="/register">
                                    Login
                                </Link>
                            </p>
                           
                        </Box>
                  
                        </Grid>
                    </Grid>
            </div>

        </>
    );
};

export default Register;
