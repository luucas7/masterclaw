import { Box, Grid } from "@mui/material";
import "../../style/compiled/cards.css";
import DeckListing from "./DeckListing";
import { Link } from "react-router-dom";

const Decks = () => {
  return (
    <>
      <div className="page-body">
        <Grid container>
          <Grid item md={7} sm={8} xs={12} className="flexbox align-end">
            <Grid container className="flexbox justify-center">
              <Grid item md={9}>
                <Box className="cards-container">
                  <DeckListing />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} sm={4} xs={12} className="flexbox justify-center">
          <Grid item md={12} xs={6}>
            <div className="flexbox justify-center">
              <Link to="/decks/new"
                className="luucky-submit">
                Create your deck
              </Link>
            </div>
          </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Decks;
