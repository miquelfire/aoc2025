export const part1 = async (d: string) => {
	const data = d.split('\n').map(e => e.split(''));
	let sum = 0;
	const grid = new Set<string>();
	data.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell == '@') {
				grid.add(y + 'x' + x);
			}
		});
	});

	grid.forEach(cell => {
		const [y, x] = cell.split('x').map(e => parseInt(e));
		let neighbors = 0;
		for (let ty = y - 1; ty < y + 2; ty++) {
			for (let tx = x - 1; tx < x + 2; tx++) {
				if (ty != y || tx != x) {
					if (grid.has([ty, tx].join('x'))) {
						neighbors++;
					}
				}
			}
		}
		if (neighbors < 4) {
			sum++;
		}
	});
	return sum;
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
