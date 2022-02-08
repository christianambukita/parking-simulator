import { useState, useEffect } from 'react';
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
	const displayHeight = 150;
	//console.log('scene-render');
	function getFlexDir() {
		if (scale.wide) return 'row';
		return 'column';
	}

	useEffect(() => {
		function setScaleWrap() {
			const windowWidth = window.innerWidth;
			const sceneWidth = 1000;
			const windowHeight = window.innerHeight;
			const sceneHeight = 800 + displayHeight;

			const scaleH = windowHeight / sceneHeight;
			const scaleW = windowWidth / sceneWidth;
			const scale = scaleH < scaleW ? scaleH : scaleW;
			setScale({ scale, wide: scaleW > scaleH });
		}

		setScaleWrap();
		window.addEventListener('scroll', setScaleWrap);
		window.addEventListener('resize', setScaleWrap);
		return () => {
			window.removeEventListener('scroll', setScaleWrap);
			window.removeEventListener('resize', setScaleWrap);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
