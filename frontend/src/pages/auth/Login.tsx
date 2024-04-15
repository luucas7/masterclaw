/* eslint-disable no-useless-catch */
import "../../style/compiled/form.css";
import { HOST } from "../../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { AxiosCustomResponse } from "../../types/axios";
import { sha256 } from "js-sha256";


import { FormInputFormat, FormValidationResult, FormValidator } from "../../types/form";
import useSignIn from "react-auth-kit/hooks/useSignIn";


const AskLogin = async (values: FormInputFormat): Promise<AxiosCustomResponse> => {
    console.log(values);
        
    const response = await axios.post<any, AxiosCustomResponse>(`${HOST}/auth/login`, values);
    return response;

  };

const FormInputValidation = (values: FormInputFormat): FormValidationResult => {
   return new FormValidator().validateInputs(values);
}

const Login = () => {

    const navigate = useNavigate();

    const signIn = useSignIn(); 

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const finalResult = FormInputValidation({ username: username, password: password});
        
        if (finalResult.result){

            finalResult.values.password = sha256(finalResult.values.password);

            try {
                const response = (await AskLogin(finalResult.values)).data;

                console.log(response);
                

                if (response.status === "failed") {
                    setError("Invalid username or password");
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                }
                /*signIn({
                    auth: {
                        token: response.token,
                        type: "Bearer",
                    }
                });
                navigate('/');*/

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
                            <p className="luucky-title">Login</p>
                            <Box className="luucky-form" component={'form'} autoComplete="on" onSubmit={onSubmit} >
                                <div className="luucky-input-group">

                                    <TextField id="name" label="Name" variant="outlined" value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    required type="text" margin="normal" fullWidth autoFocus
                                    error={error !== ''} helperText={error} 
                                    />

                                </div>
                                <div className="luucky-input-group">

                                    <TextField id="password" label="Password" variant="outlined" value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required type="password" margin="normal" fullWidth
                                    error={error !== ''} helperText={error}
                                    
                                    />

                                </div>

                                <input type="submit" value="Login" id="submit" className="luucky-submit"  />
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
