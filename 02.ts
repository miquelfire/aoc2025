export const part1 = async (d: string) => {
	const ranges = d.split(/,[\s]*/).map(e => e.split('-').map(e => +e));
	const regex = /^(.+?)\1$/;
	let sum = 0n;
	ranges.forEach(e => {
		for (let i = e[0]; i <= e[1]; i++) {
			if (regex.test('' + i)) {
				sum += BigInt(i);
			}
		}
	});
	return sum.toString();
};

export const part2 = async (d: string) => {
	const ranges = d.split(/,[\s]*/).map(e => e.split('-').map(e => +e));
	const regex = /^(.+?)\1+$/;
	let sum = 0n;
	ranges.forEach(e => {
		for (let i = e[0]; i <= e[1]; i++) {
			if (regex.test('' + i)) {
				sum += BigInt(i);
			}
		}
	});
	return sum.toString();
};
