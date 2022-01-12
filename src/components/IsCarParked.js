import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCar, selectSlots, setParked } from './redux/SceneSlice';

export default function IsCarParkedComponent() {
	// Parking detection logic is placed in this dummy component to avoid excessive
	// rerenders of other components since it triggers a rerender on every car step
	const carPosition = useSelector(selectCar);
	const slotsPositions = useSelector(selectSlots);
	const dispatch = useDispatch();

	useEffect(() => {
		function isCarParked() {
			const { left, right, top, bottom } = carPosition;
			let carParkedState = {};
			Object.keys(slotsPositions).forEach((index) => {
				const slot = slotsPositions[index];
				let conditionsPassed = 0;
				carParkedState[index] = false;
				if (left > slot.left) conditionsPassed++;
				if (right < slot.right) conditionsPassed++;
				if (top > slot.top) conditionsPassed++;
				if (bottom < slot.bottom) conditionsPassed++;
				if (conditionsPassed === 4) carParkedState[index] = true;
			});
			dispatch(setParked(carParkedState));
		}
		if (carPosition && slotsPositions) {
			isCarParked();
		}
	}, [carPosition, dispatch, slotsPositions]);

	return <></>;
}
