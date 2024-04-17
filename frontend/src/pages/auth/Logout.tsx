import { CircularProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const signOut = useSignOut();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    
    useEffect(() => {
        signOut();
        setTimeout(() => {
            setLoading(false);
            navigate('/');
            
        }, 1000);
    }, [signOut])
 

    return (
        <>
            <div className='page-body flexbox'>
                <Grid container display={'flex'} className='flexbox justify-center'>

                {loading ? <CircularProgress/> : <p>Vous êtes déconnecté</p>}
                </Grid>
            </div>
        </>
    );
};

export default Logout;