import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import ParkingSlots from './ParkingSlots';

export default function Scene() {
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
