export const MARKET_DATA_QUERY = `query MarketDataQuery {
    markets (first: 10){
        id
        market_id
        verifier
        slashing_penalty
        metadata
        total_asks
        total_value
        total_proofs
        avg_cost
        avg_time
    }
}`;
