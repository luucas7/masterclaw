import { Box, Grid } from '@mui/material'
import '../../style/compiled/cards.css'
import DeckListing from './DeckListing'

const Decks = () => {

    return (
        <>
            <Grid container className='page-body'>

                <Grid container item md={12}>
                    <Grid item md={6}>
                        <Box className='cards-container '>
                            <DeckListing/>
                        </Box>
                    </Grid>
                </Grid>

                <Grid item md={6} className='flexbox flex-row justify-center'>
                    <Box className='cards-container'>
                    </Box>
                </Grid>
                

            </Grid>
        </>
    )
}   


export default Decks