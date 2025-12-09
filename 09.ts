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
	const list = d.split('\n').map(e => e.split(',').map(e => parseInt(e)));
	const edges: {left: number, right: number, top:number, bottom: number}[] = [];
	for (let i = 0; i < list.length; i++) {
		const a = list[i];
		const b = list[(i + 1) % list.length];
		edges.push({
			left: Math.min(a[0], b[0]),
			right: Math.max(a[0], b[0]),
			top: Math.min(a[1], b[1]),
			bottom: Math.max(a[1], b[1]),
		});
	}

	// Checks if the box overlaps an edge
	const checkAABB = (a: number[], b: number[]) => {
		const boxLeft = Math.min(a[0], b[0]);
		const boxRight = Math.max(a[0], b[0]);
		const boxTop = Math.min(a[1], b[1]);
		const boxBottom = Math.max(a[1], b[1]);

		for (const edge of edges) {
			const ArightB = boxLeft >= edge.right;
			const AleftB = boxRight <= edge.left;
			const AaboveB = boxBottom <= edge.top;
			const AbelowB = boxTop >= edge.bottom;
			if (!(ArightB || AleftB || AaboveB || AbelowB)) {
				return true;
			}
		}
		return false;
	};

	let maxArea = 0;
	for (let i = 0; i < list.length; i++) {
		const [x1, y1] = list[i];
		for (let j = i + 1; j < list.length; j++) {
			const [x2, y2] = list[j];
			const area = (1 + Math.abs(x2 - x1)) * (1 + Math.abs(y2 - y1));
			if (!checkAABB(list[i], list[j])) {
				maxArea = Math.max(area, maxArea);
			}
		}
	}

	return maxArea;
};
