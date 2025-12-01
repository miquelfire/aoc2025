const splitAt = (index: number, xs: string) => [xs.slice(0, index), xs.slice(index)];

export const part1 = async (d: string) => {
	let pos = 50;
	let count = 0;

	d.split('\n').forEach(e => {
		const temp = splitAt(1, e);
		const dir = temp[0];
		const amount = +temp[1];
		if (dir == 'L') {
			pos -= amount;
		} else {
			pos += amount;
		}
		pos %= 100;
		if (pos < 0) {
			pos += 100;
		}
		if (pos == 0) {
			count++;
		}
	});

	return count;
};

export const part2 = async (d: string) => {
	let pos = 50;
	let count = 0;

	d.split('\n').forEach(e => {
		const temp = splitAt(1, e);
		const dir = temp[0];
		let amount = +temp[1];
		if (dir == 'L') {
			while (amount--) {
				pos--;
				if (pos == 0) {
					count++;
				}
				if (pos < 0) {
					pos += 100;
				}
			}
		} else {
			while (amount--) {
				pos++;
				if (pos == 100) {
					count++;
					pos = 0;
				}
			}
		}
	});

	// 5876 too low...
	// 6997 Too high

	return count;
};
