import { Box } from '@mui/material';
import { Card, CardSlots } from '../ts/cards';
import CardFrame from './CardFrame';
import CardImage from './CardImage';

const DeckCardsContainer = ({ cards }: {
  cards: Card[]
}) => {
  const cardFrames: CardSlots = { cards: [...cards, ...Array(60 - cards.length).fill({})] };

  return (
    <>
      <Box className='deck-grid-container'>
        {cardFrames.cards.map((card) => {
          return (
              <CardFrame>
                {card.exists && <CardImage card={card} />}
              </CardFrame>
          );
        })}
      </Box>
    </>
  );
}

export default DeckCardsContainer;