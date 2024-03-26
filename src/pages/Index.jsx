import React, { Suspense } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import Header from "../components/layout/Header";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndex from "../components/market/FearGreedIndex";
import CryptoTable from "../components/market/CryptoTable";
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
      <Suspense fallback={<Spinner />}>
        <CryptoTable />
      </Suspense>
      <InformationPanels />
      <NewsletterSubscription />
      <Footer />
    </Box>
  );
};
export default Index;
