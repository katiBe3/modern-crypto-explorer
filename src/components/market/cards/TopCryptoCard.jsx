import React from "react";  
import { Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Card from "../../layout/Card";
const TopCryptoCard = ({ assets }) => {
    const mostWanted = assets.filter((crypto) => crypto.growth > 0).slice(0, 3);
    const topDecliningCryptos = assets.filter((crypto) => crypto.growth < 0).slice(0, 3);
    const smallCapFastGrowingCryptos = assets
        .filter((crypto) => crypto.growth > 0)
        .sort((a, b) => a.marketCap - b.marketCap)
        .slice(0, 3);

    return (
        <Card title="🔥 Most Wanted">
          <Stack spacing={2}>
            {mostWanted.map((item, index) => (
              <Flex key={index}>
                <Text fontWeight="bold">
                  {index + 1}. {item.name}
                </Text>
                <Spacer />
                <Text color={item.change.includes("+") ? "green.500" : "red.500"} fontWeight="bold">
                  {item.change}
                </Text>
              </Flex>
            ))}
          </Stack>  
        </Card>
    );
};

export default TopCryptoCard;