import "../../style/compiled/form.css";
import { HOST } from "../../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";


const Login = () => {

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        const username = form.elements.username.value;
        const password = form.elements.password.value;
        form.elements.password.value = '';

        const values = { username: username, password: password };

        console.log('Tentative de connexion');

        try {
            const response = await axios.post(`${HOST}/login`, values);


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
            <div className="page-body flexbox justify-center">

            <Container className="">
                        <Row className="flexbox justify-center">
                        <Col md={6} className="luucky-form-container ">
                            <p className="luucky-title">Connexion</p>
                            <form className="luucky-form" onSubmit={handleLogin}>
                                <div className="luucky-input-group">
                                    <label htmlFor="username">Pseudo</label>
                                    <input type="text" name="username" id="username" placeholder="" />
                                </div>
                                <div className="luucky-input-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder=""
                                    />
                                </div>
                                <input type="submit" value="Se connecter" id="submit" className="luucky-submit" />
                            </form>

                            <div className="luucky-social-message">
                                <div className="luucky-line"></div>
                            </div>

                            <p className="luucky-signup">
                                Pas de compte ?
                                <Link to="/register">
                                    &nbsp;S'inscrire
                                </Link>
                            </p>
                           
                        </Col>
                        </Row>
          
            </Container>
            </div>

        </>
    );
};

export default Login;
