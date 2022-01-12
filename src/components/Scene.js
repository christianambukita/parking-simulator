import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import Instrucion from './Instruction';
import ParkingSlots from './ParkingSlots';
import { selectDummySlots } from './redux/AppSlice';
import Display from './Display';

export default function Scene() {
	const [scale, setScale] = useState(1);
	const dummySlots = useSelector(selectDummySlots);
	//console.log('scene-render');
	return (
		<div className='scene-container flex-container'>
			<div className='scene' style={{ '--scale': scale }}>
				<ParkingSlots setScale={setScale} scale={scale} />
				<Instrucion />
				<Display />
				<Car />
				{dummySlots.map((slot) => (
					<DummyCar key={`dummy-${slot.slot}`} slot={slot} scale={scale} />
				))}
			</div>
		</div>
	);
}
