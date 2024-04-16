import { useSnackbar } from "../hooks/useSnackbar";
import { Alert, Snackbar } from "@mui/material";


const GlobalSnackbar = () => {
  const { snackbar, closeSnackbar } = useSnackbar();

  const alert = <Alert severity={snackbar.type} variant="filled" sx={{ width: "100%" }}>{snackbar.message}</Alert>;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration || 3000}
        onClose={closeSnackbar}
        children={alert}>
          
      </Snackbar>
    </>
  );
};

export default GlobalSnackbar;
