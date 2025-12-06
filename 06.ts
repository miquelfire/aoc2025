export const part1 = async (d: string) => {
	const data = d.split('\n').map(e => e.trim().split(/ +/));
	const commands = data.pop();
	const numbers = data.map(e => e.map(e => BigInt(e)));
	const subtotals = numbers.shift();
	numbers.forEach(row => row.forEach((number, col) => {
		switch (commands[col]) {
			case '+':
				subtotals[col] += number;
				break;
			case '*':
				subtotals[col] *= number;
				break;
		}
	}));
	return subtotals.reduce((p,v) => p + v, 0n).toString();
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
