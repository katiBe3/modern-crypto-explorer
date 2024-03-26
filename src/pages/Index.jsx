import React, { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
const CryptoTable = React.lazy(() => import("../components/market/CryptoTable"));
const InformationPanels = React.lazy(() => import("../components/market/InformationPanels"));
const NewsletterSubscription = React.lazy(() => import("../components/common/NewsletterSubscription"));
const Footer = React.lazy(() => import("../components/layout/Footer"));

const Index = () => {
  // const [assetsData, setAssetsData] = useState([]);
 

  return (
    <Box align="center">
      <Header />
      <MarketTeaser />
      <FearGreedIndex />
      <CryptoTable />
      <InformationPanels />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};
export default Index;
