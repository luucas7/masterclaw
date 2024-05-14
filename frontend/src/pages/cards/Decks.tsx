import { Box, Grid } from "@mui/material";
import "../../style/compiled/cards.css";
import DeckListing from "./DeckListing";
import AddDeck from "./AddDeck";

const Decks = () => {
  return (
    <>
      <div className="page-body">
        <Grid container>
          <Grid item md={6} className="flexbox align-end">
            <Grid container className="flexbox justify-center">
              <Grid item md={9}>
                <Box className="cards-container">
                  <DeckListing />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <AddDeck />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Decks;
