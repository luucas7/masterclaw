import { Link } from 'react-router-dom';
import '../style/compiled/header.css';
import { Grid } from '@mui/material';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const Header = () => {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            <header>
                <Grid container>
                    <Grid item md={4} sm={3} xs={2} className='flexbox flex-row justify-start'>
                        <Link to="/" >Masterclaw</Link>
                    </Grid >
                    <Grid item md={7} sm={8} xs={7} className='flexbox flex-row justify-start'>
                        <Link to='/adventure' >Adventure</Link>
                        <Link to='/cards' >Cards</Link>
                        <Link to='/decks' >Decks</Link>
                    </Grid >
                    <Grid item md={1} sm={1} xs={3} className='flexbox flex-row justify-end'>
                        {!isAuthenticated ? <Link to='/login' >Login</Link>
                            : <Link to='/logout' >Logout</Link>}
                    </Grid >
                </Grid >
            </header>
        </>
    )
}

export default Header