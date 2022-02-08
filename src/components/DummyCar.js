import React from 'react';
import { useSelector } from 'react-redux';
import '../css/DummyCar.css';
import { selectSlots } from './redux/SceneSlice';

export default function DummyCar({ slot, scale }) {
	const carDimensions = {
		width: 120,
		height: 200,
	};
	const displayHeight = 150;
	const slotsPositions = useSelector(selectSlots);
	function getPosition() {
		if (slotsPositions) {
			let {
				left: sLeft,
				top: sTop,
				width: sWidth,
				height: sHeight,
			} = slotsPositions[slot.slot];
			let { width, height } = carDimensions;
			let left = sLeft + (sWidth - width * scale.scale) / 2;
			let top =
				sTop +
				(sHeight - height * scale.scale) / 2 -
				displayHeight * scale.scale;
			left = left / scale.scale;
			top = top / scale.scale;
			return { left, top };
		}
	}
	//console.log('dummy-render');
	return (
		<div
			className='dummy-car-container flex-container'
			style={slotsPositions && getPosition()}>
			<div className='dummy-car-wheels d-c-top'></div>
			<div className='dummy-car-wheels d-c-bottom'></div>
			<div className='dummy-car-body' style={{ background: slot.color }}></div>
		</div>
	);
}
