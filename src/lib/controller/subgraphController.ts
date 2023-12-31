import {
	ALL_ASKS_OF_MARKET_FOR_USER_QUERY,
	COMPLETED_ASKS_FOR_MARKET_QUERY,
	MARKET_DATA_QUERY,
	NOT_COMPLETED_ASKS_FOR_MARKET_QUERY,
	PENDING_OR_ASSIGNED_ASKS_FOR_MARKET_QUERY,
	ORDER_BOOK_DATA_QUERY
} from '$lib/constants/subgraphQueries';
import { SUBGRAPH_API_ENDPOINT } from '$lib/constants/common';

async function subgraphQueryWrapper(url: string, query: string, variables: Record<string, any>) {
	const options = {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables: { ...variables }
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		const result = await fetch(url, options);
		return result.json();
	} catch (error) {
		return error;
	}
}

export async function getMarketDataFromSubgraph(timeStamp: number) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = MARKET_DATA_QUERY;
	const response = await subgraphQueryWrapper(url, query, { timeStamp });
	return response;
}

export async function getNotCompletedAsksForMarketFromSubgraph(marketId: string) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = NOT_COMPLETED_ASKS_FOR_MARKET_QUERY;
	const response = await subgraphQueryWrapper(url, query, { marketId });
	return response;
}

export async function getCompletedAsksForMarketFromSubgraph(marketId: string) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = COMPLETED_ASKS_FOR_MARKET_QUERY;
	const response = await subgraphQueryWrapper(url, query, { marketId });
	return response;
}

export async function getPendingOrAssignedAsksForMarketFromSubgraph(marketId: string) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = PENDING_OR_ASSIGNED_ASKS_FOR_MARKET_QUERY;
	const response = await subgraphQueryWrapper(url, query, { marketId });
	return response;
}

export async function getAsksOfMarketForUserFromSubgraph(userAddress: string, marketId: string) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = ALL_ASKS_OF_MARKET_FOR_USER_QUERY;
	const response = await subgraphQueryWrapper(url, query, {
		userAddress: '0xcc9f0defa87ecba1dfb6d7c9103f01feaf547dba',
		marketId
	});
	return response;
}

export async function getOrderBookDataFromSubgraph(marketId: string) {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = ORDER_BOOK_DATA_QUERY;
	const response = await subgraphQueryWrapper(url, query, { marketId });
	return response;
}
