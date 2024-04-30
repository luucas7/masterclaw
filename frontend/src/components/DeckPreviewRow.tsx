import { Grid, TableRow } from "@mui/material";
import { DeckPreview } from "../ts/cards";

const TableRowsMUI = ({ deck }: { 
  deck: DeckPreview
}) => {

  return (
    <>
      <TableRow>
        <Grid container spacing={2} className="deck-preview">
          <Grid item md={3}>
            <div className="image-container">
            <img src={deck.image} alt={deck.name} />
            </div>
          </Grid>
          <Grid item md={9}>
              <p className="deck-name">{deck.name}</p>
              <p className="deck-description">
                {deck.description ?? "No description..."}
              </p>
          </Grid>
        </Grid>
      </TableRow>
    </>
  );
};

export default TableRowsMUI;
