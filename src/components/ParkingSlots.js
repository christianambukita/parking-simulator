import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../css/ParkingSlots.css';
import { selectTargetSlot } from './redux/AppSlice';
import { setSlotsPositions } from './redux/SceneSlice';

let initialState = {};
for (let i = 0; i < 10; i++) {
	initialState[i] = {};
}

export default function ParkingSlots({ scale }) {
	const dispatch = useDispatch();
	const parkingRef = useRef(null);
	const targetSlot = useSelector(selectTargetSlot);

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
			let { top, bottom, left, right, width, height } = box;
			newPositions[index] = { top, bottom, left, right, width, height };
		});
		dispatch(setSlotsPositions(newPositions));
	}

	useEffect(() => {
		getSlotsPositions();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const isTargetSlot = (index) => targetSlot && targetSlot.slot === index;
	function getTargetDir(index) {
		if (!isTargetSlot(index)) return '';
		const dir = targetSlot.direction;
		return <p>{dir ? 'FRONT' : 'BACK'}</p>;
	}
	const getRow = (index) => (index < 5 ? 0 : 1);
	function toParkingSlots(array) {
		return array.map((index) => (
			<div className='flex-container' key={`p-${index}`}>
				<div
					ref={slotRefs[index]}
					className={`slot${
						isTargetSlot(index) ? ' target flex-container' : ''
					}${getRow(index) ? ' bottom' : ''}`}>
					{getTargetDir(index)}
				</div>
				<div className='slot-line'></div>
			</div>
		));
	}

	useEffect(() => {
		getSlotsPositions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scale.scale]);

	return (
		<div ref={parkingRef} className='parking-slots flex-container'>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				{toParkingSlots([0, 1, 2, 3, 4])}
			</div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				{toParkingSlots([5, 6, 7, 8, 9])}
			</div>
		</div>
	);
}
