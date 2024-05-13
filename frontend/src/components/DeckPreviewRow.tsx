import { Grid, TableRow } from "@mui/material";
import { DeckPreview } from "../ts/cards";
import SquaredImage from "./SquaredImage";
import Text from "./Text";

const TableRowsMUI = ({ deck }: { deck: DeckPreview }) => {
  return (
    <>
      <TableRow>
        <Grid container padding={0.5}>
          <Grid item md={3}>
            <SquaredImage src={deck.image} alt={deck.name} />
          </Grid>
          <Grid item md={9} padding={0.75}>
            <Text content={deck.name} bold color="white" />
            <Text content={deck.description} color="grey" />
          </Grid>
        </Grid>
      </TableRow>
    </>
  );
};

export default TableRowsMUI;
