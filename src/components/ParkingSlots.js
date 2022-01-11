import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../css/ParkingSlots.css';
import { selectParked, setSlotsPositions } from './redux/SceneSlice';

let initialState = {};
for (let i = 0; i < 10; i++) {
	initialState[i] = {};
}

export default function ParkingSlots({ setScale, scale }) {
	const dispatch = useDispatch();
	const parkingRef = useRef(null);
	const { payload: carParked } = useSelector(selectParked);
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
		setScaleWrap();
	}

	useEffect(() => {
		getSlotsPositions();
		window.addEventListener('scroll', getSlotsPositions);
		window.addEventListener('resize', getSlotsPositions);
		return () => {
			window.removeEventListener('scroll', getSlotsPositions);
			window.removeEventListener('resize', getSlotsPositions);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toParkingSlots(array) {
		return array.map((index) => (
			<div className='flex-container' key={`p-${index}`}>
				<div
					ref={slotRefs[index]}
					className={`slot${
						carParked && carParked[index] ? ' parked' : ''
					}`}></div>
				<div className='slot-line'></div>
			</div>
		));
	}
	function setScaleWrap() {
		const windowWidth = window.innerWidth;
		const sceneWidth = parkingRef.current.offsetWidth;
		if (sceneWidth > windowWidth) setScale(windowWidth / sceneWidth);
	}
	useEffect(() => {
		getSlotsPositions();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scale]);

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
