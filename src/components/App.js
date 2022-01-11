import { useState } from 'react';
import '../css/App.css';
import Instrucion from './Instruction';
import Scene from './Scene';

function App() {
	const dummyCarCount = 4;
	const slotsAmount = 10;
	function getDummySlots(count = dummyCarCount, slots = slotsAmount) {
		//dummyCarCount has to be lower than slotsAmount (dummyCarCount<slotsAmount)
		if (count < slotsAmount) {
			let newSlots = [];
			const getRandomSlot = () => Math.floor(Math.random() * slots);
			for (let i = 0; i < count; i++) {
				let newSlot = getRandomSlot();
				while (newSlots.includes(newSlot)) newSlot = getRandomSlot();
				newSlots.push(newSlot);
			}
			return newSlots;
		}
		return [];
	}
	const [dummySlots, setDummySlots] = useState(getDummySlots());

	getDummySlots();
	return (
		<div id='app'>
			<Instrucion></Instrucion>
			<Scene dummySlots={dummySlots} />
		</div>
	);
}

export default App;
