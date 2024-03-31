import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    // Darker purple
    darker: "#4138A8",
    // Purple.
    main: "#4A3FBF",
    lighter: "#6E66CC"
  },
  gray: {
    50: "#F5F5F5", // white smoke
    100:"#EBEBEB", // Anti flash white
    200: "#E0E0E0" // Platinum
  },
  fonts: {
    heading: "'Nunito', sans-serif'",
    body: "'Nunito', sans-serif'",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
