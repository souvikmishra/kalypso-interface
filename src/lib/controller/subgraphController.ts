import { MARKET_DATA_QUERY } from '$lib/constants/subgraphQueries';
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

export async function getMarketDataFromSubgraph() {
	const url = SUBGRAPH_API_ENDPOINT;
	const query = MARKET_DATA_QUERY;
	const response = await subgraphQueryWrapper(url, query, {});
	return response;
}
