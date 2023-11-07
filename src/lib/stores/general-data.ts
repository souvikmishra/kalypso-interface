import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { persisted } from './persisted-store';
import onboard from './web3-onboard';

const wallets$ = onboard.state.select('wallets');
export const web3WalletStore = writable<any[]>([]);
wallets$.subscribe((wallets) => {
	web3WalletStore.set(wallets);
});

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

export const selectedMarket: Writable<any> = writable('');

export const connected: Readable<boolean> = derived(web3WalletStore, ($web3walletStore) => {
	return $web3walletStore.length > 0;
});
