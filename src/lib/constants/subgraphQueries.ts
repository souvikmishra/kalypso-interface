export const MARKET_DATA_QUERY = `query MarketDataQuery ($timeStamp: BigInt) {
  markets {
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
  askRequests(orderBy: created_at_ts, orderDirection: desc, where: {created_at_ts_gt: $timeStamp}) {
    id
    created_at_ts
    market {
      market_id
    }
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
      generator_info {
        proof_generation_cost
      }
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
      generator_info {
        proof_generation_cost
      }
    }
  }
}`;

export const PENDING_OR_ASSIGNED_ASKS_FOR_MARKET_QUERY = `query CompletedMarketAsksQuery($marketId: String)  {
  askRequests (where: {market: $marketId, state_in: [CREATE, ASSIGNED] }) {
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
      generator_info {
        proof_generation_cost
      }
    }
  }
}`;

export const ALL_ASKS_OF_MARKET_FOR_USER_QUERY = `query AllAsksForUserQuery($userAddress: String, $marketId: String)  {
  askRequests (where: {prover: $userAddress, market: $marketId}) {
    prover
    id
    state
    prover_data
    secret_data
    expiry
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
      generator_info {
        proof_generation_cost
      }
    }
  }
}`;
