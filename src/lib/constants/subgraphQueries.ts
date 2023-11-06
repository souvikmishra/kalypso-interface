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

export const ALL_ASKS_FOR_MARKET_QUERY = `query AllMarketAsksQuery($marketId: String!)  {
    askRequests(first: 100, where: {market: $marketId}) {
        prover
        id
        state
        market {
          id
          market_id
        }
        proving_time
        reward
        task {
          generator
          assigned_at
          completed_at
        }
    }
}`;
