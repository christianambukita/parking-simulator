import { useEffect } from 'react';
import { useState } from 'react';
import '../css/App.css';
import IsCarParked from './IsCarParked';
import Scene from './Scene';

function getDummySlots(dummyCarCount, slotsAmount, colorsAmount) {
	//dummyCarCount has to be lower than slotsAmount (dummyCarCount<slotsAmount)
	if (dummyCarCount < slotsAmount) {
		let newSlots = [];
		const getRandomSlot = () => Math.floor(Math.random() * slotsAmount);
		function getColor(colorsAmount) {
			let randomColor = Math.floor(Math.random() * colorsAmount);
			return `var(--c${randomColor})`;
		}

		for (let i = 0; i < dummyCarCount; i++) {
			let newSlot = getRandomSlot();
			let newColor = getColor(colorsAmount);
			while (newSlots.map((e) => e.slot).includes(newSlot))
				newSlot = getRandomSlot();
			newSlots.push({ slot: newSlot, color: newColor });
		}
		return newSlots;
	}
	return [];
}

function App() {
	const dummyCarCount = 5;
	const slotsAmount = 10;
	const colorsAmount = 12;

	const [dummySlots, setDummySlots] = useState([]);
	useEffect(() => {
		setDummySlots(getDummySlots(dummyCarCount, slotsAmount, colorsAmount));
	}, []);
	//console.log('app-render');
	return (
		<div id='app'>
			<Scene dummySlots={dummySlots} />
			<IsCarParked />
		</div>
	);
}

export default App;
