import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	goBackward,
	goForward,
	setAngleLeft,
	setAngleRight,
} from './redux/SceneSlice';

import '../css/Car.css';
import { selectPosition } from './redux/SceneSlice';

const degToRad = (deg) => (deg * Math.PI) / 180;

export default function Car() {
	const dispatch = useDispatch();
	const [wheelAxisDistance, setAxisDistance] = useState();
	const [wheelHeight, setWheelHeight] = useState();
	let position = useSelector(selectPosition);
	const [carPositionTranslation, setPosition] = useState({
		translation: {
			x: 200,
			y: 200,
		},
		rotationAngle: 0,
	});
	const [wheelRotationAngle, setAngle] = useState();

	function getLineEquation({ x: xA, y: yA }, { x: xB, y: yB }) {
		//Y = A*X + B
		const A = (yA - yB) / (xA - xB);
		const B = yA - ((yA - yB) / (xA - xB)) * xA;
		return { A, B };
	}

	function getWheelDistance() {
		const wheelFrontLeft = document
			.getElementById('wheel-fl')
			.getBoundingClientRect();
		const wheelBackRight = document
			.getElementById('wheel-br')
			.getBoundingClientRect();
		let newDistance = {
			vertical: wheelBackRight.y - wheelFrontLeft.y,
			horizontal: wheelBackRight.x - wheelFrontLeft.x,
		};
		return newDistance;
	}

	function getCarTranslation() {
		let { translation, rotationAngle } = carPositionTranslation;
		//console.log(translation)
		let { x, y } = translation;
		return {
			transform: `translate(${x}px,${y}px) rotate(${rotationAngle}deg)`,
		};
	}

	function getRearAxis() {
		const { rotationAngle: BETA } = carPositionTranslation;
		const wheelRearLeft = document
			.getElementById('wheel-bl')
			.getBoundingClientRect();
		const wheelRearRight = document
			.getElementById('wheel-br')
			.getBoundingClientRect();
		//console.log(wheelRearLeft.left)
		//wheel left bottom corner
		let W1 = {};
		let W2 = {};

		const boundWidth = wheelRearLeft.width;
		if (BETA < 0) {
			const ALPHA = 180 - 90 + BETA;
			//car turning left => left wheel is lower
			//console.log("alfa", ALPHA)
			W1.x = (wheelHeight * Math.cos(degToRad(ALPHA))) / 2;
			W1.y = (wheelHeight / 2) * Math.sin(degToRad(ALPHA));
			W1.x += wheelRearLeft.left;
			W1.y = wheelRearLeft.bottom - W1.y;

			W2.x = W1.x + wheelAxisDistance.horizontal * Math.cos(degToRad(BETA));
			W2.y = W1.y + wheelAxisDistance.horizontal * Math.sin(degToRad(BETA));
		} else {
			const ALPHA = 180 - 90 - BETA;
			//car turning right => right wheel is lower
			W1.x = boundWidth - (wheelHeight / 2) * Math.cos(degToRad(ALPHA));
			W1.y = (wheelHeight / 2) * Math.sin(degToRad(ALPHA));
			W1.x += wheelRearRight.left;
			W1.y = wheelRearRight.bottom - W1.y;
			//console.log(wheelAxisDistance.horizontal )
			W2.x = W1.x - wheelAxisDistance.horizontal * Math.cos(degToRad(BETA));
			W2.y = W1.y - wheelAxisDistance.horizontal * Math.sin(degToRad(BETA));
		}
		return getLineEquation(W1, W2);
		//console.log(getLineEquation(W1, W2))
	}

	function getRotationRadius() {
		if (position.wheelAngle !== 0) {
			let GAMMA = 90 - Math.sqrt(Math.pow(position.wheelAngle, 2));
			//Radius from wheel center to center of rotation
			let R = wheelAxisDistance.vertical * Math.tan(degToRad(GAMMA));
			//Radius from car center of symetry to center of rotation
			R += wheelAxisDistance.horizontal / 2;
			console.log(wheelAxisDistance.vertical, GAMMA, R);
			return R;
		}
		return undefined;
	}

	function getCarTranslation2(distance = 100) {
		//distance - translation distance if it was straight line

		const corRadius = getRotationRadius();
		const alpha = (distance * 360) / (2 * Math.PI * corRadius);
		const beta = (180 - alpha) / 2;
		console.log(alpha, beta);
		const translation = {
			x: 2 * corRadius * Math.pow(Math.cos(degToRad(beta)), 2),
			y: corRadius * Math.sin(degToRad(beta * 2)),
		};
		console.log(translation, alpha);
	}

	useEffect(() => {
		let newTranslation = {
			transform: `translate(200px, ${position.y}px)`,
		};
		//setPosition(newTranslation)
	}, [position.y]);

	useEffect(() => {
		let newRotationAngle = {
			transform: `rotate(${position.wheelAngle}deg)`,
		};
		setAngle(newRotationAngle);

		if (getRotationRadius()) {
			getCarTranslation2();
		}
	}, [position.wheelAngle]);

	useEffect(() => {
		setAxisDistance({ vertical: 100, horizontal: 100 });
		//setAxisDistance(getWheelDistance())
		setWheelHeight(50);
		//setWheelHeight(document.getElementById("wheel-bl").getBoundingClientRect().height)
	}, []);
	useEffect(() => {
		if (wheelAxisDistance) getRearAxis();
	}, [wheelAxisDistance]);

	useEffect(() => {
		function dispatchKey({ key }) {
			//console.log(key)
			switch (key) {
				case 'ArrowUp':
					dispatch(goForward());
					break;
				case 'ArrowDown':
					dispatch(goBackward());
					break;
				case 'ArrowRight':
					dispatch(setAngleRight());
					break;
				case 'ArrowLeft':
					dispatch(setAngleLeft());
					break;
			}
		}

		document.addEventListener('keydown', dispatchKey);
		return () => window.removeEventListener('keydown', dispatchKey);
	}, []);

	return (
		<>
			<div className='car flex-container' style={getCarTranslation()}>
				<div
					id='wheel-fl'
					className='wheel w-left w-front'
					style={wheelRotationAngle}></div>
				<div
					id='wheel-fr'
					className='wheel w-right w-front'
					style={wheelRotationAngle}></div>
				<div id='wheel-bl' className='wheel w-left w-back'></div>
				<div id='wheel-br' className='wheel w-right w-back'></div>
				<div className='car-body'></div>
			</div>

			{/* <div className="axis">{ wheelAxisDistance && drawAxis(getRearAxis())}</div> */}
		</>
	);
}

// function drawAxis(axis){
//     //console.log(axis)
//     if(axis){
//         let points = []
//         let offset = 0;
//         for(let i = 300 + offset; i < 400 + offset; i++){
//             points.push(
//                 <div key={i} className="point" style={{
//                     top: `${axis.A*i + axis.B}px`,
//                     left: `${i}px`
//                 }}></div>
//             )
//         }
//         return points
//     }
//     return ""
// }
