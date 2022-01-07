import '../css/Scene.css';
import Car from './Car';
import DummyCar from './DummyCar';
import ParkingSlots2x3 from './ParkingSlots2x3';

export default function Scene() {
	return (
		<div className='scene-container flex-container'>
			<div className='scene'>
				<ParkingSlots2x3 />
				<Car />
				<DummyCar />
			</div>
		</div>
	);
}
