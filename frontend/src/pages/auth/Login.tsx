import "../../style/compiled/form.css";
import { HOST } from "../../config";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";

import { FormInputFormat, FormValidationResult, FormValidator } from "../../types/form";
import useSignIn from "react-auth-kit/hooks/useSignIn";


const FormInputValidation = (values: FormInputFormat): FormValidationResult => {
   return new FormValidator().validateInputs(values);
}

const Login = () => {

    const navigate = useNavigate();

    const signIn = useSignIn(); 

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const onSubmit = () => {
        const finalResult = FormInputValidation({ username: username, password: password});

        
        if (finalResult.result){

            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response = axios.get<any, AxiosCustomResponse>(`${HOST}/auth/login`, { params: finalResult.values });


                signIn({
                    auth: {
                        token: response.token,
                        type: "Bearer",
                    }
                });
                navigate('/');

            } catch (err) {
                console.log(err);
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
                            <p className="luucky-title">Login</p>
                            <Box className="luucky-form" component={'form'} autoComplete="on">
                                <div className="luucky-input-group">

                                    <TextField id="name" label="Name" variant="outlined" value={username} onChange={(e) => { setUsername(e.target.value) }}
                                    required type="text" margin="normal" fullWidth autoFocus/>

                                </div>
                                <div className="luucky-input-group">

                                    <TextField id="password" label="Password" variant="outlined" value={password} onChange={(e) => { setPassword(e.target.value) }}
                                    required type="password" margin="normal" fullWidth />

                                </div>

                                <input type="button" value="Login" id="submit" className="luucky-submit" onClick={onSubmit} />
                            </Box>

                            <div className="luucky-social-message">
                                <div className="luucky-line"></div>
                            </div>

                            <p className="luucky-signup">
                                No account yet ?&nbsp;
                                <Link to="/register">
                                    Register
                                </Link>
                            </p>
                           
                        </Box>
                  
                        </Grid>
                    </Grid>
            </div>

        </>
    );
};

export default Login;
