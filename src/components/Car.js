import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import '../css/Car.css';
import { selectKeyboard, setCarPosition } from './redux/SceneSlice';

const degToRad = (deg) => (deg * Math.PI) / 180;

const CAR_CONFIG = {
	body: {
		width: 100,
		height: 200,
	},
	wheel: {
		height: 50,
		width: 20,
		maxSteringAngle: 35,
		distance: {
			horizontal: 100,
			vertical: 100,
		},
	},
	initialPosition: {
		translation: {
			x: 10,
			y: 320,
		},
		rotationAngle: 90,
	},
	moveStep: {
		translation: 5,
		rotation: 5,
	},
};

const handledKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

function getPosition({ translation, rotationAngle }) {
	return {
		'--t-x': `${translation.x}em`,
		'--t-y': `${translation.y}em`,
		'--t-r': `${rotationAngle}deg`,
	};
}

function getWheelAngle(wheelAngle) {
	return { '--wheel-angle': `${wheelAngle}deg` };
}

function getRotationRadius(wheelAngle, wheel) {
	if (wheelAngle !== 0) {
		let GAMMA = 90 - Math.sqrt(Math.pow(wheelAngle, 2));
		//Radius from wheel center to center of rotation
		let R = wheel.distance.vertical * Math.tan(degToRad(GAMMA));
		//Radius from car center of symetry to center of rotation
		R += wheel.distance.horizontal / 2;
		//console.log(wheel.distance.vertical, GAMMA, R)
		return R;
	}
	return 0;
}

function getCarTranslation(moveStep, wheelAngle, wheel, carPosition) {
	const corRadius = getRotationRadius(wheelAngle, wheel);
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

export default function Car() {
	const carRef = useRef(null);
	const dispatch = useDispatch();
	const screenKeyboard = useSelector(selectKeyboard);

	const { wheel, initialPosition, moveStep } = CAR_CONFIG;

	const [carPosition, setPosition] = useState(initialPosition);
	const [wheelAngle, setAngle] = useState(0);

	const stepDelay = 30;
	const [loopTick, setLoopTick] = useState(false);
	const [keysState, setKeyState] = useState({});

	const keyEventLogger = function (e) {
		let keyState = e.type === 'keydown';
		if (handledKeys.includes(e.key)) {
			e.preventDefault();
			setKeyState({ ...keysState, [e.key]: keyState });
		}
	};

	function setTranslation(
		direction,
		{ translation: oldT, rotationAngle: oldR } = carPosition
	) {
		//direction: true = forward, false = backward
		let newStep = (direction ? -1 : 1) * moveStep.translation;

		const { translation: newT, rotationAngle: newR } = getCarTranslation(
			newStep,
			wheelAngle,
			wheel,
			carPosition
		);
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
		const maxAngle = CAR_CONFIG.wheel.maxSteringAngle;
		const isMaxAngle = newAngle > maxAngle || newAngle < -maxAngle;
		setAngle(isMaxAngle ? wheelAngle : newAngle);
	}

	//main loop
	useEffect(() => {
		function keyFunctions(key) {
			const functions = {
				ArrowUp: () => setTranslation(true),
				ArrowDown: () => setTranslation(false),
				ArrowRight: () => setAngleWrap(true),
				ArrowLeft: () => setAngleWrap(false),
			};

			return functions[key]();
		}
		Object.keys(screenKeyboard).forEach((key) => {
			if (screenKeyboard[key]) {
				keyFunctions(key);
			}
		});
		Object.keys(keysState).forEach((key) => {
			if (keysState[key]) {
				keyFunctions(key);
			}
		});
		setTimeout(() => setLoopTick(!loopTick), stepDelay);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loopTick]);

	useEffect(() => {
		const box = carRef.current.getBoundingClientRect();
		const { top, bottom, left, right } = box;
		const { rotationAngle } = carPosition;
		dispatch(setCarPosition({ top, bottom, left, right, rotationAngle }));
	}, [carPosition, dispatch]);

	useEffect(() => {
		//focus car to enable key events
		carRef?.current.focus();

		//start main loop
		setLoopTick(true);
	}, []);

	useEffect(() => {
		const focusCar = () => {
			carRef?.current.focus();
		};
		if (carRef && carRef.current) {
			carRef.current.addEventListener('focusout', focusCar);

			return (carRef) => {
				carRef?.current.removeEventListener('focusout', focusCar);
			};
		}
	}, [carRef]);

	return (
		<>
			<div
				ref={carRef}
				className='car flex-container'
				style={{ ...getPosition(carPosition), ...getWheelAngle(wheelAngle) }}
				onKeyDown={keyEventLogger}
				onKeyUp={keyEventLogger}
				tabIndex={1}>
				<div id='wheel-fl' className='wheel w-left w-front'></div>
				<div id='wheel-fr' className='wheel w-right w-front'></div>
				<div id='wheel-bl' className='wheel w-left w-back'></div>
				<div id='wheel-br' className='wheel w-right w-back'></div>
				<div className='car-body'></div>
			</div>
		</>
	);
}
