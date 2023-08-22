import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import theme from "./customThemes";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider } from "@mui/material";
import "./index.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <SnackbarProvider>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
