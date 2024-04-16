/* eslint-disable no-useless-catch */
import '../../style/compiled/form.css';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useSnackbar } from '../../hooks/useSnackbar';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { authentification } from '../../auth/authentification';


const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signIn = useSignIn();

    // Output 
    const { openSnackbar } = useSnackbar();
    const [error, setError] = useState<boolean>(false);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await authentification({
            username: username,
            password: password,
            path: 'register',
            navigate: navigate,
            signIn: signIn,
            showOutput: openSnackbar,
            gotError: setError
        })
        
    };



    return (
        <>
            <div className='page-body flexbox'>
            <Grid container display={'flex'} className='flexbox justify-center'>
                <Grid item lg={4} md={5} sm={6} xs={7}>
                        <Box className='luucky-form-container' >
                            <p className='luucky-title'>Login</p>
                            <Box className='luucky-form' component={'form'} autoComplete='on' onSubmit={onSubmit} onChange={() => {error && setError(false)}} >
                                <div className='luucky-input-group'>
                                    <TextField id='name' label='Name' variant='outlined' value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    required type='text' margin='normal' fullWidth autoFocus
                                    error={error} 
                                    />
                                </div>
                                
                                <div className='luucky-input-group'>
                                    <TextField id='password' label='Password' variant='outlined' value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required type='password' margin='normal' fullWidth
                                    error={error} helperText={error}
                                    />
                                </div>

                                <input type='submit' value='Login' id='submit' className='luucky-submit'   />
                            </Box>

                            <div className='luucky-social-message'>
                                <div className='luucky-line'></div>
                            </div>

                            <p className='luucky-signup'>
                                No account yet ?&nbsp;
                                <Link to='/register'>
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
