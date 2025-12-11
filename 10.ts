interface MachineInfo {
	lights: number[],
	buttons: number[][],
	joltage: number[],
	presses: number,
	// Don't know what Part 2 needs yet. Joltage scares me
}

function parseInput(input: string) {
	const lineRegex = /^\[([.#]+)] (\(.+\)) {(.+)}$/;
	const buttonRegex = /\(([^)]+)\)/g;
	const data = lineRegex.exec(input);
	if (data == null) {
		throw new Error(`Data error with the following string: ${input}`);
	}

	const machineInfo: MachineInfo = {
		lights: data[1].split('').map(e => (e == '#') ? 1 : 0),
		buttons: [],
		joltage: data[3].split(',').map(e => parseInt(e)),
		presses: 0,
	};

	let buttons = buttonRegex.exec(data[2]);
	if (buttons == null) {
		throw new Error(`Data error handling button with the follow string: ${input}`);
	}
	while (buttons != null) {
		machineInfo.buttons.push(buttons[1].split(',').map(e => parseInt(e)));
		buttons = buttonRegex.exec(data[2]);
	}

	return machineInfo;
}

export const part1 = async (d: string) => {
	const machines = d.split('\n').map(e => parseInput(e));
	machines.forEach(machine => {
		const buttonIdx = machine.lights.map((e, i) => (e == 1) ? i: -1).filter(e => e != -1).join(',');
		const buttonsPatternLengthTest = (2 ** machine.buttons.length) - 1;
		
		console.log(`===${buttonIdx}===`);
		for (let j = 1; j <= buttonsPatternLengthTest; j ++) {
			const buttonsToPress = [...Array(machine.buttons.length)].map((x,i)=>j>>i&1);
			console.log(buttonsToPress);
		}
		/*
		void add1(int *a, int len) {
			int carry = 1;
			for (int i = len - 1; carry > 0 && i >= 0; i--) {
			  int result = a[i] + carry;
			  carry = result >> 1;
			  a[i] = result & 1;
			}
		  }
		*/
	});
	return machines;
};

export const part2 = async (d: string) => {
	const machines = d.split('\n').map(e => parseInput(e));
	machines.splice(0, machines.length);
	return machines;
};
