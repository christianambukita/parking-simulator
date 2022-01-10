import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import '../css/ParkingSlots.css';

let initialState = {};
for (let i = 0; i < 10; i++) {
	initialState[i] = {};
}

export default function ParkingSlots() {
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
	const [slots, setSlot] = useState(
		Object.keys(slotRefs).map((index) => ({
			ref: slotRefs[index],
			position: {
				top: null,
				right: null,
				bottom: null,
				left: null,
			},
		}))
	);

	function getSlotId(slotIndex) {
		const idA = slotIndex < 5 ? 0 : 1;
		const idB = slotIndex < 5 ? slotIndex : slotIndex - 5;
		return `s-${idA}-${idB}`;
	}

	function getSlotsPositions() {
		slots.forEach((slot) => {
			console.log(slot.ref.current.getBoundingClientRect());
		});
	}
	useEffect(() => {
		console.log(slots);
		getSlotsPositions();
	}, []);
	return (
		<div className='parking-slots flex-container'>
			<div className='endline'></div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div ref={slots[0].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[1].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[2].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[3].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[4].ref} className='slot'></div>
				<div className='slot-line'></div>
			</div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div ref={slots[5].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[6].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[7].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[8].ref} className='slot'></div>
				<div className='slot-line'></div>
				<div ref={slots[9].ref} className='slot'></div>
				<div className='slot-line'></div>
			</div>
			<div className='endline bottom-line'></div>
		</div>
	);
}
