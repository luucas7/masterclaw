import { ENDPOINTS, SERVER_HOST } from "../../config";
import { useCallback, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Named } from "../../ts/user";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Grid } from "@mui/material";
import DeckInfosForm from "../../components/DeckInfosForm";
import DeckCardsContainer from "../../components/DeckCardsContainer";
import { Card } from "../../ts/cards";
import SearchBar from "../../components/SearchBar";

const NewDeck = () => {

  const [cookies] = useCookies();
  const user = useAuthUser<Named>();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const { openSnackbar } = useSnackbar();
  const [error, setError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [deckname, setDeckname] = useState<string>("");
  const [mainDeck, setMainDeck] = useState<Card[]>([]);

  const createDeck = useCallback(() => {
    axios.post(`${SERVER_HOST}${ENDPOINTS.DECKS}/add`, {
      jwt: cookies._auth,
      username: user?.name,
      deckname: deckname,
      description: description,
      mainDeck: []
    });
  }, [cookies._auth, user, deckname, description]);

  return (
    <>
      <div className="page-body">
        <Grid container >
          <Grid item md={7} sm={7} xs={12} className="flexbox justify-center">
            <DeckCardsContainer cards={mainDeck} />
          </Grid>
          <Grid item md={5} sm={5} xs={12} className="flexbox justify-center-r align-center">
            <SearchBar />
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="flexbox justify-center-r align-center" >
            <DeckInfosForm />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NewDeck;
