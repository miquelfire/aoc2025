// A quick look at my input, and I feel not using BigInt would create edge cases
export const part1 = async (d: string) => {
	// process the database
	const database = d.split('\n\n');
	const freshRanges = database[0].split('\n').map(e => e.split('-').map(e => BigInt(e))).map(e => (ingredient: bigint) => ingredient >= e[0] && ingredient <= e[1]);
	const questionableIngredients = database[1].split('\n').map(e => BigInt(e));
	const freshIngredients = questionableIngredients.map(ingredient => {
		let isFresh = false;
		for (const rangeCheck of freshRanges) {
			if (rangeCheck(ingredient)) {
				isFresh = true;
			}
		}
		return (isFresh) ? 1 : 0; // To allow reduce to be simpler
	}).reduce((p, v) => p + v, 0);
	return freshIngredients;
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
