import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedWalletsModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

const injected = injectedWalletsModule();
const walletConnect = walletConnectModule({
	connectFirstChainId: true,
	version: 1,
	qrcodeModalOptions: {
		mobileLinks: ['metamask', 'argent', 'trust']
	}
});

const wallets = [injected, walletConnect];

const chains = [
	{
		id: 1,
		token: 'ETH',
		label: 'Ethereum Mainnet',
		rpcUrl: `https://rpc.ankr.com/eth`
	},
	{
		id: 137,
		token: 'MATIC',
		label: 'Matic Mainnet',
		rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
	}
];

const appMetadata = {
	name: 'Proofs Dashboard',
	icon: `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
<path d="M27.3031 9.10902L14.5019 18.8893C14.4205 18.9543 14.3159 18.9888 14.2114 18.9888H1.74325C1.5186 18.9888 1.42177 18.7056 1.59994 18.5717L14.3973 8.7876C14.4786 8.72255 14.5832 8.68811 14.6878 8.68811H27.1598C27.3844 8.68811 27.4812 8.97127 27.3031 9.10519V9.10902ZM10.2412 0.0557611C9.97399 -0.0475516 9.668 -0.00546126 9.43947 0.166727L0.650984 6.88588C0.449573 7.03894 0.333374 7.27617 0.333374 7.52489V16.9608C0.333374 17.2975 0.724576 17.485 0.991833 17.2822L12.2825 8.64985L18.4604 3.92808C18.7121 3.73676 18.654 3.34646 18.3597 3.23167L10.2412 0.0557611ZM27.6749 10.6319L16.3843 19.2605L10.0941 24.0664C9.8423 24.2577 9.9004 24.648 10.1948 24.7628L18.3132 27.9425C18.5804 28.0497 18.8864 28.0038 19.1149 27.8316L28.0158 21.0282C28.2172 20.8752 28.3334 20.638 28.3334 20.3892V10.9495C28.3334 10.6128 27.9422 10.4253 27.6749 10.6281V10.6319Z" fill="url(#paint0_linear_137_666)"/>
<defs>
<linearGradient id="paint0_linear_137_666" x1="0.333374" y1="13.8993" x2="28.3334" y2="13.8993" gradientUnits="userSpaceOnUse">
<stop stop-color="#9753EE"/>
<stop offset="1" stop-color="#417FF8"/>
</linearGradient>
</defs>
</svg>`,
	logo: `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
<path d="M27.3031 9.10902L14.5019 18.8893C14.4205 18.9543 14.3159 18.9888 14.2114 18.9888H1.74325C1.5186 18.9888 1.42177 18.7056 1.59994 18.5717L14.3973 8.7876C14.4786 8.72255 14.5832 8.68811 14.6878 8.68811H27.1598C27.3844 8.68811 27.4812 8.97127 27.3031 9.10519V9.10902ZM10.2412 0.0557611C9.97399 -0.0475516 9.668 -0.00546126 9.43947 0.166727L0.650984 6.88588C0.449573 7.03894 0.333374 7.27617 0.333374 7.52489V16.9608C0.333374 17.2975 0.724576 17.485 0.991833 17.2822L12.2825 8.64985L18.4604 3.92808C18.7121 3.73676 18.654 3.34646 18.3597 3.23167L10.2412 0.0557611ZM27.6749 10.6319L16.3843 19.2605L10.0941 24.0664C9.8423 24.2577 9.9004 24.648 10.1948 24.7628L18.3132 27.9425C18.5804 28.0497 18.8864 28.0038 19.1149 27.8316L28.0158 21.0282C28.2172 20.8752 28.3334 20.638 28.3334 20.3892V10.9495C28.3334 10.6128 27.9422 10.4253 27.6749 10.6281V10.6319Z" fill="url(#paint0_linear_137_666)"/>
<defs>
<linearGradient id="paint0_linear_137_666" x1="0.333374" y1="13.8993" x2="28.3334" y2="13.8993" gradientUnits="userSpaceOnUse">
<stop stop-color="#9753EE"/>
<stop offset="1" stop-color="#417FF8"/>
</linearGradient>
</defs>
</svg>`,
	description: 'Proofs Dashboard App',
	recommendedInjectedWallets: [
		{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
		{ name: 'MetaMask', url: 'https://metamask.io' }
	]
};
let onboard;

if (!onboard) {
	onboard = Onboard({
		wallets,
		chains,
		appMetadata,
		accountCenter: {
			mobile: {
				enabled: false
			},
			desktop: {
				enabled: false
			}
		},
		theme: 'dark'
	});
}

export default onboard as OnboardAPI;
