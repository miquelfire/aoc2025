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
	let combos = 0;
	machines.forEach(machine => {
		const buttonIdx = machine.lights.map((e, i) => (e == 1) ? i : -1).filter(e => e != -1).join(',');
		const buttonCount = machine.buttons.length;
		const buttonsPatternLengthTest = (2 ** buttonCount) - 1;
		let minButtons = buttonCount;

		for (let j = 1; j <= buttonsPatternLengthTest; j++) {
			const buttonsToPress = [...Array(buttonCount)].map((x, i) => j >> i & 1);
			const buttonsToggled = Array.from(machine.lights, () => 0);
			for (let i = 0; i < buttonsToPress.length; i++) {
				if (buttonsToPress[i]) {
					for (const button of machine.buttons[i]) {
						buttonsToggled[button] ^= 1;
					}
				}
			}
			const lights = buttonsToggled.map((e, i) => (e == 1) ? i : -1).filter(e => e != -1).join(',');
			if (lights == buttonIdx) {
				minButtons = Math.min(minButtons, buttonsToPress.filter(e => e).length);
			}
		}
		combos += minButtons;
	});
	return combos;
};

export const part2 = async (d: string) => {
	const machines = d.split('\n').map(e => parseInput(e));
	machines.splice(0, machines.length);
	return machines;
};
