import { Box, Grid, TextField } from "@mui/material";

const DeckInfosForm = () => {

  return (
    <>
      <Grid container className="flexbox justify-start">
        <Grid item lg={7}>
          <Box className="luucky-form-container">
            <p className="luucky-title">New deck</p>
            <Box
              className="luucky-form"
              component={"form"}
              autoComplete="on"
            >
              <div className="luucky-input-group">
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  required
                  type="text"
                  margin="normal"
                  fullWidth
                  autoFocus
                />
              </div>

              <div className="luucky-input-group">
                <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  type="text"
                  margin="normal"
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>

              <div className="flexbox justify-center">
                <input
                  type="submit"
                  value="Create"
                  id="submit"
                  className="luucky-submit"
                />
              </div>
            </Box>

            <div className="luucky-social-message">
              <div className="luucky-line"></div>
            </div>

          </Box>
        </Grid>
      </Grid>

    </>
  );
}

export default DeckInfosForm;