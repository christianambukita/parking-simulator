import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import ParkingSlots from './ParkingSlots';
import { selectCar, selectSlots, setParked } from './redux/SceneSlice';

export default function Scene() {
	const { payload: carPosition } = useSelector(selectCar);
	const { payload: slotsPositions } = useSelector(selectSlots);
	const dispatch = useDispatch();

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
	useEffect(() => {
		if (carPosition && slotsPositions) {
			isCarParked();
		}
	}, [carPosition]);

	return (
		<div className='scene-container flex-container'>
			<div className='scene'>
				<ParkingSlots />
				<Car />
				<DummyCar />
			</div>
		</div>
	);
}
