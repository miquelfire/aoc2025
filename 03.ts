export const part1 = async (d: string) => {
	const data = d.split('\n').map(e => e.split('').map(e => +e));
	let sum = 0;
	data.forEach(pack => {
		const maxValues = [pack[0], pack[1]];
		for (let battery = 1; battery < pack.length; battery++) {
			if (pack[battery] > maxValues[0] && battery < pack.length - 1) {
				maxValues[0] = pack[battery];
				maxValues[1] = pack[battery + 1];
			} else if (pack[battery] > maxValues[1]) {
				maxValues[1] = pack[battery];
			}
		}
		sum += +(maxValues.join(''));
	});
	return sum;
};

export const part2 = async (d: string) => {
	const data = d.split('\n').map(e => e.split('').map(e => BigInt(e)));
	let sum = 0n;
	data.forEach(pack => {
		const maxValues = [];
		let start = 0;
		for (let i = 0; i < 12; i++) {
			maxValues.push(pack[start]);
			start++;
			const end = pack.length - (11 - i);
			for (let k = start; k < end; k++) {
				if (pack[k] > maxValues[i]) {
					maxValues[i] = pack[k];
					start = k + 1;
				}
			}

		}

		sum += BigInt(maxValues.join(''));
	});
	return sum.toString();
};
