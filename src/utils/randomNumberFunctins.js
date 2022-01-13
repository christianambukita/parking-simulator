const getRandomSlot = (slotsAmount) => Math.floor(Math.random() * slotsAmount);

export function getUniqueRandomSlot(slotsArray, slotsAmount) {
	let newSlot = getRandomSlot(slotsAmount);
	while (slotsArray.includes(newSlot)) newSlot = getRandomSlot(slotsAmount);
	return newSlot;
}

export function getDummySlots(
	dummyCarCount,
	slotsAmount,
	colorsAmount,
	parkedSlot = null
) {
	//dummyCarCount has to be lower than slotsAmount (dummyCarCount<slotsAmount)
	if (dummyCarCount < slotsAmount) {
		let newSlots = [];

		function getColor(colorsAmount) {
			let randomColor = Math.floor(Math.random() * colorsAmount);
			return `var(--c${randomColor})`;
		}

		for (let i = 0; i < dummyCarCount; i++) {
			let newSlot = getUniqueRandomSlot(
				[...newSlots.map((e) => e.slot), parkedSlot],
				slotsAmount
			);
			let newColor = getColor(colorsAmount);
			newSlots.push({ slot: newSlot, color: newColor });
		}
		return newSlots;
	}
	return [];
}
export function getTargetSlot(dummySlots, slotsAmount, prevTarget = null) {
	const direction = Math.floor(Math.random() * 2);
	const slot = getUniqueRandomSlot([...dummySlots, prevTarget], slotsAmount);
	return { slot, direction };
}
