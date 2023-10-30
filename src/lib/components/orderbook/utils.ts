/**
 * Returns the number rounded to the nearest interval.
 * Example:
 *
 *   roundToNearest(1000.5, 1); // 1000
 *   roundToNearest(1000.5, 0.5);  // 1000.5
 *
 * @param {number} value    The number to round
 * @param {number} interval The numeric interval to round to
 * @return {number}
 */
export const roundToNearest = (value: number, interval: number) => {
	return Math.floor(value / interval) * interval;
};

/**
 * Groups price levels by their price
 * Example:
 *
 *  groupByPrice([ [1000, 100], [1000, 200], [993, 20] ]) // [ [ 1000, 300 ], [ 993, 20 ] ]
 *
 * @param levels
 */
export const groupByPrice = (levels: number[][]): number[][] => {
	return levels
		.map((level, idx) => {
			const nextLevel = levels[idx + 1];
			const prevLevel = levels[idx - 1];

			if (nextLevel && level[0] === nextLevel[0]) {
				return [level[0], level[1] + nextLevel[1]];
			} else if (prevLevel && level[0] === prevLevel[0]) {
				return [];
			} else {
				return level;
			}
		})
		.filter((level) => level.length > 0);
};

/**
 * Group price levels by given ticket size. Uses groupByPrice() and roundToNearest()
 * Example:
 *
 * groupByTicketSize([ [1000.5, 100], [1000, 200], [993, 20] ], 1) // [[1000, 300], [993, 20]]
 *
 * @param levels
 * @param ticketSize
 */
export const groupByTicketSize = (levels: number[][], ticketSize: number): number[][] => {
	return groupByPrice(levels.map((level) => [roundToNearest(level[0], ticketSize), level[1]]));
};

export const formatNumber = (arg: number): string => {
	return new Intl.NumberFormat('en-US').format(arg);
};

const addTotalSums = (orders: number[][]): number[][] => {
	const totalSums: number[] = [];

	return orders.map((order: number[], idx) => {
		const size: number = order[1];
		if (typeof order[2] !== 'undefined') {
			return order;
		} else {
			const updatedLevel = [...order];
			const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
			updatedLevel[2] = totalSum;
			totalSums.push(totalSum);
			return updatedLevel;
		}
	});
};

const addDepths = (orders: number[][], maxTotal: number): number[][] => {
	return orders.map((order) => {
		if (typeof order[3] !== 'undefined') {
			return order;
		} else {
			const calculatedTotal: number = order[2];
			const depth = (calculatedTotal / maxTotal) * 100;
			const updatedOrder = [...order];
			updatedOrder[3] = depth;
			return updatedOrder;
		}
	});
};

const getMaxTotalSum = (orders: number[][]): number => {
	const totalSums: number[] = orders.map((order) => order[2]);
	return Math.max.apply(Math, totalSums);
};

export const createDummyState = (payload: any) => {
	const rawBids: number[][] = payload.bids;
	const rawAsks: number[][] = payload.asks;
	const bids: number[][] = addTotalSums(groupByTicketSize(rawBids, payload.groupingSize));
	const asks: number[][] = addTotalSums(groupByTicketSize(rawAsks, payload.groupingSize));
	const state: any = {};
	state.market = payload['product_id'];
	state.rawBids = rawBids;
	state.rawAsks = rawAsks;
	state.maxTotalBids = getMaxTotalSum(bids);
	state.maxTotalAsks = getMaxTotalSum(asks);
	state.bids = addDepths(bids, state.maxTotalBids);
	state.asks = addDepths(asks, state.maxTotalAsks);
	console.log('state', state)
	return state;
};
