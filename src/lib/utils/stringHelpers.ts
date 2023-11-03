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
