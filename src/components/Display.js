import React from 'react';
import { useSelector } from 'react-redux';
import { selectScore } from './redux/AppSlice';
import '../css/Display.css';

export default function Display() {
	const score = useSelector(selectScore);
	return (
		<div className='display flex-container'>
			<p className='score-display'>SCORE: {score}</p>
		</div>
	);
}
