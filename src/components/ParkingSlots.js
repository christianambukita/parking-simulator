import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import '../css/ParkingSlots.css';
import { setSlotsPositions } from './redux/SceneSlice';

let initialState = {};
for (let i = 0; i < 10; i++) {
	initialState[i] = {};
}

export default function ParkingSlots() {
	const dispatch = useDispatch();
	const slotRefs = {
		0: useRef(null),
		1: useRef(null),
		2: useRef(null),
		3: useRef(null),
		4: useRef(null),
		5: useRef(null),
		6: useRef(null),
		7: useRef(null),
		8: useRef(null),
		9: useRef(null),
	};

	function getSlotsPositions() {
		let newPositions = {};
		Object.keys(slotRefs).forEach((index) => {
			const box = slotRefs[index].current.getBoundingClientRect();
			let { top, bottom, left, right } = box;
			newPositions[index] = { top, bottom, left, right };
		});
		dispatch(setSlotsPositions(newPositions));
	}
	useEffect(() => {
		getSlotsPositions();
		//console.log(window.scrollY);
	}, []);

	return (
		<div className='parking-slots flex-container'>
			<div className='endline'></div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div ref={slotRefs[0]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[1]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[2]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[3]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[4]} className='slot'></div>
				<div className='slot-line'></div>
			</div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div ref={slotRefs[5]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[6]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[7]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[8]} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slotRefs[9]} className='slot'></div>
				<div className='slot-line'></div>
			</div>
			<div className='endline bottom-line'></div>
		</div>
	);
}
