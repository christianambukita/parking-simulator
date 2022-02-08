import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import Instrucion from './Instruction';
import Keyboard from './Keyboard';
import ParkingSlots from './ParkingSlots';
import { selectDummySlots } from './redux/AppSlice';
import TopBar from './TopBar';

export default function Scene() {
	const [scale, setScale] = useState({ scale: 1, wide: true });
	const dummySlots = useSelector(selectDummySlots);
	//console.log('scene-render');
	function getFlexDir() {
		if (scale.wide) return 'row';
		return 'column';
	}
	return (
		<div className='scene-container flex-container'>
			<div
				className='scene'
				style={{ '--scale': scale.scale, flexDirection: getFlexDir() }}>
				<TopBar />
				<ParkingSlots setScale={setScale} scale={scale} />
				<Instrucion />
				<Car />
				{dummySlots.map((slot) => (
					<DummyCar key={`dummy-${slot.slot}`} slot={slot} scale={scale} />
				))}
				<Keyboard />
			</div>
		</div>
	);
}
