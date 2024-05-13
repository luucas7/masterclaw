import { ENDPOINTS, SERVER_HOST } from "../../config";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Named } from "../../ts/user";
import { Box, Grid, TextField } from "@mui/material";
import { useSnackbar } from "../../hooks/useSnackbar";

const AddDeck = () => {

  const [cookies] = useCookies();
  const user = useAuthUser<Named>();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const { openSnackbar } = useSnackbar();
  const [error, setError] = useState<boolean>(false);


  const descriptionRef = useRef<HTMLInputElement>(null);
  const decknameRef = useRef<HTMLInputElement>(null);

  const createDeck = useCallback(() => {
    axios.post(`${SERVER_HOST}${ENDPOINTS.DECKS}/add`, {
      jwt: cookies._auth,
      username: user?.name,
      deckname: decknameRef.current?.value,
      description: descriptionRef.current?.value,
      mainDeck : []
    });
  }, [cookies._auth, user]);
  //jwt, username, deckname, description, main_deck

  return (
    <>
        <Grid container className="flexbox justify-center">
          <Grid item lg={4} md={5} sm={6} xs={7}>
            <Box className="luucky-form-container">
              <p className="luucky-title">Create a deck</p>
              <Box
                className="luucky-form"
                component={"form"}
                autoComplete="on"
                onChange={() => {
                  error && setError(false);
                }}
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
                    error={error}
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
                    error={error}
                    helperText={error && "Try again with valid credentials"}
                  />
                </div>

                <div className="flexbox justify-center">
                  <input
                    type="submit"
                    value="Create"
                    id="submit"
                    className="luucky-submit"
                    disabled={submitting}
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
};

export default AddDeck;
