import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./styles/index.scss";
import { theme } from "utils/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./contexts/authContext";
import EventContextProvider from "contexts/eventContext";
import QuestionContextProvider from "contexts/questionContext";
import VoucherContextProvider from "contexts/voucherContext";
import { Provider } from "react-redux";
import store from "store/store";

import { CloudinaryContext } from "cloudinary-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <VoucherContextProvider>
          <QuestionContextProvider>
            <CloudinaryContext cloudName="df6zgjkcl">
              <Provider store={store}>
                <ThemeProvider theme={theme}>
                  <BrowserRouter>
                    <App />
                    <ToastContainer pauseOnHover={false} />
                  </BrowserRouter>
                </ThemeProvider>
              </Provider>
            </CloudinaryContext>
          </QuestionContextProvider>
        </VoucherContextProvider>
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
