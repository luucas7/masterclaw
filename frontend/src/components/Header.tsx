import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {Link} from 'react-router-dom';
import '../style/compiled/header.css';
import { Grid } from '@mui/material';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { useEffect } from 'react';

const Header = () => {
    const user = useAuthUser();

    const isAuthenticated = useIsAuthenticated();


    useEffect(() => {
        console.log(user);
        console.log(isAuthenticated);
    }, [user, isAuthenticated])
    
  return (
    <>
        <header>
            <Grid container>
                <Grid item md={5} sm={5} xs={2} className='flexbox flex-row justify-start'>
                    <Link  to="/" >Masterclaw</Link>
                </Grid >

                <Grid item md={5} sm={5} xs={7} className='flexbox flex-row justify-start'>
                    <Link  to='/adventure' >Adventure</Link>
                    <Link className='' to='/cards' >Cards</Link>
                    <Link className='' to='/decks' >Decks</Link>  
                </Grid >

                <Grid item md={2} sm={2} xs={3} className='flexbox flex-row justify-end'>
                    {!isAuthenticated ? <Link className='' to='/login' >Login</Link>
                    : <Link className='' to='/logout' >Logout</Link>}
                </Grid >
            </Grid >
        </header>
    </>

  )
}




export default Header