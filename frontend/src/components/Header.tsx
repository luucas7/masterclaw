import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import '../style/compiled/header.css';

const Header = () => {

  return (
    <>
        <header>
            <Row>

                <Col md={5} sm={5} className='flexbox flex-row justify-start'>
                    <Link  to="/" >Triconquest</Link>
                </Col>

                <Col md={5} sm={5} className='flexbox flex-row justify-start'>
                    <Link  to='/adventure' >Adventure</Link>
                    <Link className='' to='/cards' >Cards</Link>
                    <Link className='' to='/decks' >Decks</Link>    
                </Col>

                <Col md={2} sm={2} className='flexbox flex-row justify-end'>
                    {!useAuthUser() ? <Link className='' to='/login' >Log in</Link>
                    : <Link className='' to='/logout' >Log out</Link>}
                </Col>



            </Row>
        </header>
    </>

  )
}




export default Header