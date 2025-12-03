export const part1 = async (d: string) => {
	const data = d.split('\n').map(e => e.split('').map(e => +e));
	let sum = 0;
	data.forEach(batteries => {
		const maxValues = [batteries[0], batteries[1]];
		for (let battery = 1; battery < batteries.length; battery++) {
			if (batteries[battery] > maxValues[0] && battery < batteries.length - 1) {
				maxValues[0] = batteries[battery];
				maxValues[1] = batteries[battery + 1];
			} else if (batteries[battery] > maxValues[1]) {
				maxValues[1] = batteries[battery];
			}
		}
		sum += +(maxValues.join(''));
	});
	return sum;
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
