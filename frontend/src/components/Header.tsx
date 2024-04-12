import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';



const Header = () => {

  return (
    <>
        <header>
            <Row>
                <Col>
                    <Col>
                        <Link className='' to='/' ><li>Triconquest</li></Link>
                    </Col>
                    <Col>
                        <Link className='' to='/adventure' ><li>Adventure</li></Link>
                        <Link className='' to='/cards' ><li>Cards</li></Link>

                    </Col>
                        
                    {!useAuthUser() && <Link className='' to='/login' ><li >Log in</li></Link>}      
                </Col>
            </Row>
        </header>
    </>

  )
}

export default Header