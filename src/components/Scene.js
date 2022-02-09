import { useState, useEffect } from 'react';
import '../css/Scene.css';
import Car from './Car';
import Instrucion from './Instruction';
import Keyboard from './Keyboard';
import ParkingSlots from './ParkingSlots';
import TopBar from './TopBar';

export default function Scene() {
	const [scale, setScale] = useState({ scale: 1, wide: true });
	const displayHeight = 150;
	function getFlexDir() {
		if (scale.wide) return 'row';
		return 'column';
	}

	useEffect(() => {
		function setScaleWrap() {
			const windowWidth = window.innerWidth;
			const sceneWidth = 1000;
			const windowHeight = window.innerHeight;
			const sceneHeight = 840 + displayHeight;

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
				style={{ '--scale': `${scale.scale}em`, flexDirection: getFlexDir() }}>
				<TopBar />
				<ParkingSlots setScale={setScale} scale={scale} />
				<Instrucion />
				<Car />
				<Keyboard />
			</div>
		</div>
	);
}
