import { Box } from "@mui/material";

const SearchBar = () => {
  return (
    <>
      <Box className="search-container">
        <Box className="search-bar">
          <input className="search-bar-input" type="text" placeholder="Search for cards..." />
        </Box>
        <Box className="search-results">

          <Box className="search-result">
            <Box className="search-result-image">
              <img src="https://s3.duellinksmeta.com/cards/60c2b3aaa0e24f2d54a51f3e_w420.webp" alt="Card" />
            </Box>
            <Box className="search-result-name">
              <span>Effect Veiler</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}


export default SearchBar;

