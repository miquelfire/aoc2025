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
	const data = d.split('\n').map(e => e.split(''));
	const commands = data.pop().join('').trim().split(/ +/).reverse();
	let sum = 0n;
	let subTotal = (commands[0] == '+') ? 0n : 1n;
	const rotatedData = data[0].map((val, index) => data.map(row => row[row.length-1-index]).join('').trim());
	for(const number of rotatedData) {
		if (number == '') {
			sum += subTotal;
			commands.shift();
			subTotal = (commands[0] == '+') ? 0n : 1n;
			continue;
		}
		switch (commands[0]) {
			case '+':
				subTotal += BigInt(number);
				break;
			case '*':
				subTotal *= BigInt(number);
				break;
		}
	}
	sum += subTotal;
	return sum.toString();
};
