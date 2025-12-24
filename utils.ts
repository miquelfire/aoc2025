export class PriorityQueue<T> {
	values: { priority: number, node: T }[];
	constructor() {
		this.values = [];
	}

	put(node: T, priority: number) {
		let flag = false;
		for (let i = 0; i < this.values.length; i++) {
			if (this.values[i].priority > priority) {
				this.values.splice(i, 0, { node, priority });
				flag = true;
				break;
			}
		}
		if (!flag) {
			this.values.push({ node, priority });
		}
	}

	get(): { node: T; priority: number; } {
		return this.values.shift();
	}

	get size() {
		return this.values.length;
	}
}

export function bfs(startNode: string, endNode: string, graph: Map<string, string[]>): false | string[] {
	const queue = [startNode];
	const came_from = new Map();
	came_from.set(startNode, null);

	while (queue.length > 0) {
		const currentNode = queue.shift();
		if (currentNode == endNode) break;

		// Search side paths
		graph.get(currentNode).forEach(e => {
			if (!came_from.has(e)) {
				queue.push(e);
				came_from.set(e, currentNode);
			}
		});
	}

	let currentNode = endNode;
	const path = [];
	while (currentNode != startNode) {
		path.push(currentNode);
		currentNode = came_from.get(currentNode);
		if (!currentNode) return false;
	}
	return path;

}

/**
 * Dijkstra's Algorithm
 * Broken last I checked
 */
export function ucs(startNode: string, endNode: string, graph: Map<string, { node: string; cost: number; }[]>): false | string[] {
	const queue: PriorityQueue<string> = new PriorityQueue(); // Needs to be PriorityQueue
	const came_from: Map<string, string> = new Map();
	const cost_so_far: Map<string, number> = new Map();

	queue.put(startNode, 0);
	came_from.set(startNode, null);
	cost_so_far.set(startNode, 0);

	while (queue.size > 0) {
		const { node: currentNode } = queue.get();
		if (currentNode == endNode) break;

		// Search side paths
		graph.get(currentNode).forEach(e => {
			const node = e.node;
			const cost = e.cost;
			const new_cost = cost_so_far.get(currentNode) + cost; // How to handle the cost bit?
			if (!cost_so_far.has(node) || new_cost < cost_so_far.get(node)) {
				cost_so_far.set(node, new_cost);
				queue.put(node, new_cost);
				came_from.set(node, currentNode);
			}
		});
	}

	let currentNode = endNode;
	const path = [];
	while (currentNode != startNode) {
		path.push(currentNode);
		currentNode = came_from.get(currentNode);
		if (!currentNode) return false;
	}
	return path;
}

export function gcd(a: number, b: number) {
	let t = 0;
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	a < b && (t = b, b = a, a = t); // swap them if a < b
	t = a % b;
	return t ? gcd(b, t) : b;
}

export function lcm(a: number, b: number) {
	return a / gcd(a, b) * b;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type AnyFunction = (...args: any[]) => any;

interface MemoizedFunction<T extends AnyFunction> extends CallableFunction {
	(...args: Parameters<T>): ReturnType<T>;
	clear: () => void;
}

export function memoize<T extends AnyFunction>(fn: T): MemoizedFunction<T> {
	const cache = new Map<string, ReturnType<T>>();

	const memoizedFunction = function (...args: Parameters<T>): ReturnType<T> {
		const key = JSON.stringify(args);

		if (cache.has(key)) {
			return cache.get(key)!;
		}

		const result = fn(...args);
		cache.set(key, result);

		return result;
	} as MemoizedFunction<T>;

	memoizedFunction.clear = function clear() {
		cache.clear();
	};

	Object.defineProperty(memoizedFunction, 'name', {
		value: `memoized_${fn.name}`,
		configurable: true
	});

	return memoizedFunction;
}

export function getCombinations<T> (array: T[]): T[] {
	const result = [];
	const total = Math.pow(2, array.length);

	for (let i = 1; i < total; i++) {
		const comb = [];
		for (let j = 0; j < array.length; j++) {
			if (i & (1 << j)) {
				comb.push(array[j]);
			}
		}
		result.push(comb);
	}
	return result;
}
