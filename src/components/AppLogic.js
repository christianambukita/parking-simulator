import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	scoreIncrement,
	selectDummySlots,
	selectScore,
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

function isParkedAtTarget(carParkedSlot, parkingTarget, carAngle) {
	let propperDir = false;
	const propperSlot = carParkedSlot === parkingTarget?.slot;
	let mAngle = carAngle % 360;
	mAngle = Math.sqrt(Math.pow(mAngle, 2));
	const checkBack = () => mAngle > 90 && mAngle < 270;
	const checkFront = () =>
		(mAngle > 0 && mAngle < 90) || (mAngle > 270 && mAngle < 360);
	if (parkingTarget?.direction && checkFront()) propperDir = true;
	if (!parkingTarget?.direction && checkBack()) propperDir = true;

	//if parking target is in secound row direction is reversed
	if (parkingTarget?.slot > 4) propperDir = !propperDir;

	return propperDir && propperSlot;
}

export default function AppLogic() {
	// Parking detection logic is placed in this dummy component to avoid excessive
	// rerenders of other components since it triggers a rerender on every car step
	const slotsAmount = 10;
	const colorsAmount = 12;
	const initialDummyCarCount = 4;
	const carPosition = useSelector(selectCar);
	const slotsPositions = useSelector(selectSlots);
	const carParked = useSelector(selectParked);
	const parkingTarget = useSelector(selectTargetSlot);
	const dummySlots = useSelector(selectDummySlots);
	const currentTarget = useSelector(selectTargetSlot);
	const score = useSelector(selectScore);
	const [dummyCarCount, setDummyCarCount] = useState(initialDummyCarCount);
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
		let newTargetAcquired = isParkedAtTarget(
			carParked,
			parkingTarget,
			carPosition.rotationAngle
		);
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	//Change dummy cars positions
	useEffect(() => {
		if (score !== 0 && score % 1 === 0) {
			let newDummySlots = getDummySlots(
				dummyCarCount,
				slotsAmount,
				colorsAmount,
				carParked
			);
			let newTarget = getTargetSlot(
				newDummySlots.map((slot) => slot.slot),
				slotsAmount,
				carParked
			);
			dispatch(setDummySlots(newDummySlots));
			dispatch(setTargetSlot(newTarget));
		}
		if (score !== 0 && score % 5 === 4) {
			if (dummyCarCount < 8) {
				setDummyCarCount(dummyCarCount + 1);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score, dispatch]);

	return <></>;
}
