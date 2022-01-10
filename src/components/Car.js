import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/Car.css';
import { setCarPosition } from './redux/SceneSlice';

const degToRad = (deg) => (deg * Math.PI) / 180;

const CAR_CONFIG = {
	body: {
		width: 100,
		height: 200,
	},
	wheel: {
		height: 50,
		width: 20,
		distance: {
			horizontal: 100,
			vertical: 100,
		},
	},
	initialPosition: {
		translation: {
			x: 200,
			y: 200,
		},
		rotationAngle: 0,
	},
	moveStep: {
		translation: 5,
		rotation: 5,
	},
};

export default function Car() {
	const carRef = useRef(null);
	const dispatch = useDispatch();

	const { wheel, initialPosition, moveStep } = CAR_CONFIG;

	const [carPosition, setPosition] = useState(initialPosition);
	const [wheelAngle, setAngle] = useState(0);

	function setTranslation(
		direction,
		{ translation: oldT, rotationAngle: oldR } = carPosition
	) {
		//direction: true = forward, false = backward
		let newStep = (direction ? -1 : 1) * moveStep.translation;

		const { translation: newT, rotationAngle: newR } =
			getCarTranslation(newStep);
		let newPosition = {
			translation: {
				x: oldT.x + newT.x,
				y: oldT.y + newT.y,
			},
			rotationAngle: oldR + newR,
		};
		setPosition(newPosition);
	}

	function setAngleWrap(direction) {
		//direction: true = right, false = left
		let newStep = (direction ? 1 : -1) * moveStep.rotation;
		let newAngle = wheelAngle + newStep;
		//console.table({direction, newStep, newAngle, wheelAngle, moveStep})
		setAngle(newAngle);
	}

	function getPosition({ translation, rotationAngle }) {
		return {
			'--t-x': `${translation.x}px`,
			'--t-y': `${translation.y}px`,
			'--t-r': `${rotationAngle}deg`,
		};
	}

	function getWheelAngle() {
		return { '--wheel-angle': `${wheelAngle}deg` };
	}

	function getRotationRadius() {
		if (wheelAngle !== 0) {
			let GAMMA = 90 - Math.sqrt(Math.pow(wheelAngle, 2));
			//Radius from wheel center to center of rotation
			let R = wheel.distance.vertical * Math.tan(degToRad(GAMMA));
			//Radius from car center of symetry to center of rotation
			//R += wheel.distance.horizontal / 2
			//console.log(wheel.distance.vertical, GAMMA, R)
			return R;
		}
		return 0;
	}

	function getCarTranslation(moveStep) {
		const corRadius = getRotationRadius();
		let alpha = (moveStep * 360) / (2 * Math.PI * corRadius);
		const beta = (180 - alpha) / 2;

		//initial translation
		let translation = {
			x: 2 * corRadius * Math.pow(Math.cos(degToRad(beta)), 2),
			y: corRadius * Math.sin(degToRad(beta * 2)),
		};

		if (!wheelAngle) {
			translation = { x: 0, y: moveStep };
			alpha = 0;
		}

		//additional rotation due to car rotationAngle
		let { rotationAngle: oldAngle } = carPosition;
		let newAngle = oldAngle + alpha;
		const rotatePoint = ({ x: _x, y: _y }) => ({
			x: _x * Math.cos(degToRad(newAngle)) - _y * Math.sin(degToRad(newAngle)),
			y: _y * Math.cos(degToRad(newAngle)) + _x * Math.sin(degToRad(newAngle)),
		});
		translation = rotatePoint(translation);

		//adjust x translation direction and rotation
		const direction = wheelAngle > 0 ? -1 : 1;

		let rotationAngle = alpha * direction;

		return { translation, rotationAngle };
	}

	// useEffect(() => {
	// 	carRef.current.scrollIntoView({
	// 		behacior: 'smooth',
	// 		block: 'center',
	// 		inline: 'center',
	// 	});
	// }, [carPosition]);

	function handleKeyDown(e) {
		let { key } = e;
		switch (key) {
			case 'ArrowUp':
				e.preventDefault();
				setTranslation(true);
				break;
			case 'ArrowDown':
				e.preventDefault();
				setTranslation(false);
				break;
			case 'ArrowRight':
				e.preventDefault();
				setAngleWrap(true);
				break;
			case 'ArrowLeft':
				e.preventDefault();
				setAngleWrap(false);
				break;
			default:
				return;
		}
	}
	useEffect(() => {
		const box = carRef.current.getBoundingClientRect();
		const { top, bottom, left, right } = box;
		dispatch(setCarPosition({ top, bottom, left, right }));
	}, [carPosition]);

	return (
		<>
			<div
				ref={carRef}
				className='car flex-container'
				style={{ ...getPosition(carPosition), ...getWheelAngle() }}
				onKeyDown={handleKeyDown}
				tabIndex={0}>
				<div id='wheel-fl' className='wheel w-left w-front'></div>
				<div id='wheel-fr' className='wheel w-right w-front'></div>
				<div id='wheel-bl' className='wheel w-left w-back'></div>
				<div id='wheel-br' className='wheel w-right w-back'></div>
				<div className='car-body'></div>
			</div>
		</>
	);
}
