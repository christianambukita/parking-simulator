import React from 'react';
import '../css/ParkingSlots2x3.css';

export default function ParkingSlots2x3() {
	return (
		<div className='parking-slots flex-container'>
			<div className='endline'></div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
			</div>
			<div className='parking-slots-container flex-container'>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
				<div className='slot-line'></div>
			</div>
			<div className='endline bottom-line'></div>
		</div>
	);
}
