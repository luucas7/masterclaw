import { CircularProgress, Grid } from "@mui/material";
import {  useEffect } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const signOut = useSignOut();

  const navigate = useNavigate();

  useEffect(() => {
    signOut();

      navigate("/");
      // TODO Listening on possible fix for this
      window.location.reload();
  }, [navigate]);

  return (
    <>
      <Grid container display={"flex"} className="flexbox justify-center">
        <CircularProgress />
      </Grid>
    </>
  );
};

export default Logout;
