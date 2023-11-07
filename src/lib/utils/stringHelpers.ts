// create a function to capitalise the first letter of each word of a string
export function capitaliseFirstLetters(string: string) {
	return string
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function getFirstTwoLetters(name: string) {
	if (name.length < 2) {
		return name.toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

export function getHumanReadableTime(secondsToConvert: number) {
	const days = Math.floor(secondsToConvert / 86400);
	const hours = Math.floor((secondsToConvert % 86400) / 3600);
	const minutes = Math.floor((secondsToConvert % 3600) / 60);
	const seconds = Math.floor((secondsToConvert % 3600) % 60);

	let timeString = '';
	if (days > 0) timeString += `${days}d `;
	if (hours > 0) timeString += `${hours}h `;
	if (minutes > 0) timeString += `${minutes}m `;
	if (seconds > 0) timeString += `${seconds}s`;

	return timeString.trim();
}
