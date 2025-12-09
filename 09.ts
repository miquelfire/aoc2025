export const part1 = async (d: string) => {
	const list = d.split('\n').map(e => e.split(',').map(e => parseInt(e)));
	let maxArea = 0;
	for (let i = 0; i < list.length; i++) {
		const [x1, y1] = list[i];
		for (let j = i + 1; j < list.length; j++) {
			const [x2, y2] = list[j];
			const area = (1 + Math.abs(x2 - x1)) * (1 + Math.abs(y2 - y1));
			maxArea = Math.max(area, maxArea);
		}
	}
	return maxArea;
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
