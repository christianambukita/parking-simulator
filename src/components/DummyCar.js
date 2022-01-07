import React from 'react';
import '../css/DummyCar.css';

export default function DummyCar() {
	function getColor() {
		return `var(--c${0})`;
	}

	return (
		<div className='dummy-car-container flex-container'>
			<div className='dummy-car-wheels d-c-top'></div>
			<div className='dummy-car-wheels d-c-bottom'></div>
			<div className='dummy-car-body' style={{ background: getColor() }}></div>
		</div>
	);
}
