import { Box } from '@mui/material';

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