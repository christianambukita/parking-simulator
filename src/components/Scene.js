import { useState } from 'react';
import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import Instrucion from './Instruction';
import ParkingSlots from './ParkingSlots';

export default function Scene({ dummySlots }) {
	const [scale, setScale] = useState(1);
	//console.log('scene-render');
	return (
		<div className='scene-container flex-container'>
			<div className='scene' style={{ transform: `scale(${scale})` }}>
				<ParkingSlots setScale={setScale} scale={scale} />
				<Instrucion />
				<Car />
				{dummySlots.map((slot) => (
					<DummyCar key={`dummy-${slot.slot}`} slot={slot} scale={scale} />
				))}
			</div>
		</div>
	);
}
