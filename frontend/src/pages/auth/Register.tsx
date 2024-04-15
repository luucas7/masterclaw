import "../../style/compiled/form.css";
import { HOST } from "../../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid } from "@mui/material";


const Register = () => {

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const username = form.elements.username.value;
        const password = form.elements.password.value;
        form.elements.password.value = '';

        const values = { username: username, password: password };

        console.log('Tentative de connexion');

        try {
            const response = await axios.post(`${HOST}/Register`, values);


            signIn({
                token: response.data.token,
                expiresIn: 36000,
                tokenType: "Bearer",
                authState: { username: values.username, id: response.data.id }
            })
            navigate('/');

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <div className="page-body flexbox">

            <Grid container className="flexbox justify-center">
                <Grid item lg={4} md={5} sm={6} xs={7}>
                        <div className="luucky-form-container">
                            <p className="luucky-title">Register</p>
                            <form className="luucky-form" onSubmit={handleRegister}>
                                <div className="luucky-input-group">
                                    <label htmlFor="username">Name</label>
                                    <input type="text" name="username" id="username" placeholder="" />
                                </div>
                                <div className="luucky-input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder=""
                                    />
                                </div>
                                <input type="submit" value="Register" id="submit" className="luucky-submit" />
                            </form>

                            <div className="luucky-social-message">
                                <div className="luucky-line"></div>
                            </div>

                            <p className="luucky-signup">
                                You have an account ?&nbsp;
                                <Link to="/register">
                                    Login
                                </Link>
                            </p>
                           
                        </div>
                  
                        </Grid>
                    </Grid>
            </div>

        </>
    );
};

export default Register;
