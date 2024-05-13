/* eslint-disable no-useless-catch */
import "../../style/compiled/form.css";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useSnackbar } from "../../hooks/useSnackbar";
import { authentification } from "../../auth/authentification";

type State = {
  username: string;
  password: string;
  email: string;
};

type Action = {
  type: string;
  value: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.value };
    case "password":
      return { ...state, password: action.value };
    case "email":
      return { ...state, email: action.value };
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    email: "",
  });

  const onDispatch = (type: string, value: string) => {
    dispatch({ type: type, value: value });
  };

  const navigate = useNavigate();
  const signIn = useSignIn();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { openSnackbar } = useSnackbar();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setSubmitting(true);

    console.log(state.email);
    
    await authentification({
      username: state.username,
      password: state.password,
      email: state.email,
      path: "register",
      navigate: navigate,
      signIn: signIn,
      showOutput: openSnackbar,
      gotError: setError,
    });
    setSubmitting(false);
  };

  return (
    <>
      <div className='page-body flexbox'>
        <Grid container display={"flex"} className="flexbox justify-center">
          <Grid item lg={4} md={5} sm={6} xs={7}>
            <Box className="luucky-form-container">
              <p className="luucky-title">Create an account</p>
              <Box
                className="luucky-form"
                component={"form"}
                autoComplete="on"
                onSubmit={onSubmit}
                onChange={() => {
                  error && setError(false);
                }}
              >
                <div className="luucky-input-group">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={state.email}
                    autoFocus
                    onChange={(e) => {
                      onDispatch("email", e.target.value);
                    }}
                    required
                    type="email"
                    margin="normal"
                    fullWidth
                    error={error}
                  
                  />
                </div>

                <div className="luucky-input-group">
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={state.username}
                    onChange={(e) => {
                      onDispatch("username", e.target.value);
                    }}
                    required
                    type="text"
                    margin="normal"
                    fullWidth
                    error={error}
                  />
                </div>

                <div className="luucky-input-group">
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={state.password}
                    onChange={(e) => {
                      onDispatch("password", e.target.value);
                    }}
                    required
                    type="password"
                    margin="normal"
                    fullWidth
                    error={error}
                  />
                </div>

                <div className="flexbox justify-center">
                  <input
                    type="submit"
                    value="Register"
                    id="submit"
                    className={"luucky-submit"}
                    disabled={submitting}
                  />
                </div>
              </Box>

              <div className="luucky-social-message">
                <div className="luucky-line"></div>
              </div>

              <p className="luucky-signup">
                You have an account ?&nbsp;
                <Link to="/login">Login</Link>
              </p>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;
