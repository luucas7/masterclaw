import createStore from "react-auth-kit/createStore";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "react-auth-kit";
import {SnackbarProvider} from "./context/SnackbarProvider";
import 'style/style.css'

const App = () => {

  interface IUserData {
    name: string;
    uuid: string;
  }

  const store = createStore<IUserData>({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
  });

  return (
    <>
      <AuthProvider store={store}>
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </AuthProvider>
    </>
  );
};

export default App;
