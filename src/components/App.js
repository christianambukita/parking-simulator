import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/App.css';
import { getDummySlots, getTargetSlot } from '../utils/randomNumberFunctins';
import IsCarParked from './IsCarParked';
import { setTargetSlot } from './redux/AppSlice';
import Scene from './Scene';

function App() {
	const dummyCarCount = 5;
	const slotsAmount = 10;
	const colorsAmount = 12;
	const dispatch = useDispatch();

	const [dummySlots, setDummySlots] = useState([]);
	useEffect(() => {
		let newDummySlots = getDummySlots(dummyCarCount, slotsAmount, colorsAmount);
		let newTarget = getTargetSlot(
			newDummySlots.map((slot) => slot.slot),
			slotsAmount
		);

		setDummySlots(newDummySlots);
		dispatch(setTargetSlot(newTarget));
	}, [dispatch]);
	//console.log('app-render');
	return (
		<div id='app'>
			<Scene dummySlots={dummySlots} />
			<IsCarParked />
		</div>
	);
}

export default App;
