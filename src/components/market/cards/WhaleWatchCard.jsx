import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Card from "../../layout/Card";

const WhaleWatchCard = () => {
    const [whaleActivity, setWhaleActivity] = useState(null);

    useEffect(() => {
        const fetchWhaleActivity = async () => {
            try {
                // Fetch whale activity data from the Blockchain.com API
                const response = await fetch("https://api.blockchain.com/v3/exchange/largest_trades");
                if (!response.ok) {
                    throw new Error("Failed to fetch whale activity");
                }
                const data = await response.json();
                // Check if there are any large trades
                const hasLargeTrades = data && data.trades && data.trades.length > 0;
                return hasLargeTrades;
            } catch (error) {
                console.error("Error fetching whale activity:", error.message);
                return null;
            }
        };

        fetchWhaleActivity().then((activity) => {
            setWhaleActivity(activity);
        });
    }, []);

    return (
        <Card title="🐋 Whale Watch">
            <Flex align="center">
                {whaleActivity !== null ? (
                    <>
                        {whaleActivity === true ? (
                            <span>ETH whales are making waves! 🌊 Their recent moves could signal a big splash in the market. Stay alert and ride the tide! 🚀</span>
                        ) : (
                            <span>No significant whale activity detected at the moment. Keep an eye on the market for updates.</span>
                        )}
                    </>
                ) : (
                    <span>Loading whale activity...</span>
                )}
            </Flex>
        </Card>
    );
};

export default WhaleWatchCard;
