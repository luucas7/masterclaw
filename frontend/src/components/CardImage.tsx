import { Box } from '@mui/material';
import { Card } from '../ts/cards';

const CardImage = ({ card }: {
  card: Card
}) => {

  return (
    <>
    <Box className="card-image">
      <img src={card.image} alt={card.name} />
    </Box>
    </>
  );
}

export default CardImage;