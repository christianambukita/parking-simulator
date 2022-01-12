import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	scoreIncrement,
	selectDummySlots,
	selectTargetSlot,
	setDummySlots,
} from './redux/AppSlice';
import { setTargetSlot } from './redux/AppSlice';
import { getDummySlots, getTargetSlot } from '../utils/randomNumberFunctins';
import {
	selectCar,
	selectParked,
	selectSlots,
	setParked,
} from './redux/SceneSlice';

function isCarParked(carPosition, slotsPositions, dispatch) {
	const { left, right, top, bottom } = carPosition;
	let carParkedSlot = null;
	Object.keys(slotsPositions).forEach((index) => {
		const slot = slotsPositions[index];
		let conditionsPassed = 0;
		if (left > slot.left) conditionsPassed++;
		if (right < slot.right) conditionsPassed++;
		if (top > slot.top) conditionsPassed++;
		if (bottom < slot.bottom) conditionsPassed++;
		if (conditionsPassed === 4) carParkedSlot = Number(index);
	});

	return carParkedSlot;
}

function isParkedAtTarget(carParkedSlot, parkingTargetSlot) {
	return carParkedSlot === parkingTargetSlot;
}

export default function AppLogic() {
	// Parking detection logic is placed in this dummy component to avoid excessive
	// rerenders of other components since it triggers a rerender on every car step
	const carPosition = useSelector(selectCar);
	const slotsPositions = useSelector(selectSlots);
	const carParked = useSelector(selectParked);
	const parkingTarget = useSelector(selectTargetSlot);
	const dummySlots = useSelector(selectDummySlots);
	const currentTarget = useSelector(selectTargetSlot);
	const dummyCarCount = 5;
	const slotsAmount = 10;
	const colorsAmount = 12;
	const dispatch = useDispatch();
	const [targetAcquired, setTargetAcquired] = useState(false);

	//Check if player car is parked in any parking slot and if so dispatch slot index
	useEffect(() => {
		if (carPosition) {
			let newParkedSlot = isCarParked(carPosition, slotsPositions, dispatch);
			if (newParkedSlot !== carParked) dispatch(setParked(newParkedSlot));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [carPosition, dispatch]);

	//Chcek if player car is parked in target parking slot
	useEffect(() => {
		let newTargetAcquired = isParkedAtTarget(carParked, parkingTarget);
		setTargetAcquired(newTargetAcquired);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [carParked, dispatch]);

	//If target is aquired increment score
	useEffect(() => {
		if (targetAcquired) {
			dispatch(scoreIncrement());
			setTargetAcquired(false);

			let newTarget = getTargetSlot(
				dummySlots.map((slot) => slot.slot),
				slotsAmount,
				currentTarget
			);

			dispatch(setTargetSlot(newTarget));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [targetAcquired, dispatch]);

	//Set initial dummy cars slots and target slot
	useEffect(() => {
		let newDummySlots = getDummySlots(dummyCarCount, slotsAmount, colorsAmount);
		let newTarget = getTargetSlot(
			newDummySlots.map((slot) => slot.slot),
			slotsAmount
		);

		dispatch(setDummySlots(newDummySlots));
		dispatch(setTargetSlot(newTarget));
	}, [dispatch]);

	return <></>;
}
