export const MARKET_DATA_QUERY = `query MarketDataQuery {
  markets (first: 10) {
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

export const NOT_COMPLETED_ASKS_FOR_MARKET_QUERY = `query NotCompletedMarketAsksQuery($marketId: String)  {
  askRequests (where: {market: $marketId, state_not_in: [COMPLETE] }) {
    prover
    id
    state
    prover_data
    secret_data
    market {
      id
      market_id
    }
    proving_time
    reward
    task {
      generator
      assigned_at_ts
      completed_at_ts
    }
  }
}`;

export const COMPLETED_ASKS_FOR_MARKET_QUERY = `query CompletedMarketAsksQuery($marketId: String)  {
  askRequests (where: {market: $marketId, state_in: [COMPLETE] }) {
    prover
    id
    state
    prover_data
    secret_data
    market {
      id
      market_id
    }
    proving_time
    reward
    task {
      generator
      assigned_at_ts
      completed_at_ts
    }
  }
}`;
