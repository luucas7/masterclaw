import { Box } from '@mui/material';
import '../style/compiled/cards.css';

const CardFrame = ({ children }: {
  children?: React.ReactNode;
}) => {
  return (
    <>
      <Box className="card-frame">
        {children}
      </Box>
    </>
  );
}

export default CardFrame;