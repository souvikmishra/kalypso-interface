// export interface EthereumProvider {
// 	isMetaMask: boolean | EthereumProvider | undefined;
// 	on?: (...args: any[]) => void;
// 	removeListener?: (...args: any[]) => void;
// 	removeAllListeners?: (...args: any[]) => void;
// 	autoRefreshOnNetworkChange?: boolean;
// 	request: (...args: any[]) => void;
// }

import type { providers } from 'ethers';

declare global {
	interface Window {
		ethereum?: providers.ExternalProvider;
		web3?: any;
	}
}

export type IAccountsChangedListener = (accounts: string[]) => void;
export type IChainChangedListener = (chainIdHex: string) => void;
export type IAccountDisconnectListener = () => void;
