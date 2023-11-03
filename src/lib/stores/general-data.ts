import { derived, writable, type Writable } from 'svelte/store';
import { persisted } from './persisted-store';

export const showFavouritesHeader = writable(true);

export const generalData = persisted<{
	selected: string;
	favourites: string[];
}>('proof-market-general-data', {
	selected: 'c1/ta',
	favourites: []
});

export const allHeaderTradingPairs = derived([generalData], ([$generalData]) => {
	return Array.from(new Set($generalData.favourites).add($generalData.selected));
});

export const marketDataStore: Writable<{ loading: boolean; data: [] }> = writable({
	loading: true,
	data: []
});
