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
	const ranges = d.split('\n\n')[0].split('\n').map(e => e.split('-').map(e => BigInt(e)));
	const simpleRanges: bigint[][] = [];

	ranges.sort((a, b) => Number(a[0] - b[0]));
	let previous = ranges[0];
	simpleRanges.push(previous);

	for (let i = 1; i < ranges.length; i++) {
		const current = ranges[i];
		if (previous[1] >= current[0]) {
			previous[1] = previous[1] > current[1] ? previous[1] : current[1];
		} else {
			simpleRanges.push(current);
			previous = current;
		}
	}
	let result = 0n;
	simpleRanges.forEach(range => {
		result += range[1] - range[0] + 1n;
	});
	return result.toString();
};
