import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default React.memo(Layout);
