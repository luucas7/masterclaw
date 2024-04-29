import { Box, Grid } from "@mui/material";
import "../../style/compiled/cards.css";
import DeckListing from "./DeckListing";

const Decks = () => {
  return (
    <>
      <div className="page-body">
        <Grid container>
          <Grid item md={6}>
            <Grid container className="flexbox justify-center">
              <Grid item md={8}>
                <Box className="cards-container ">
                  <DeckListing />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Box className="cards-container"></Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Decks;
