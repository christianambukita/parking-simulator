import React from 'react';
import { useSelector } from 'react-redux';
import { selectScore, toggleKeyboard } from './redux/AppSlice';
import '../css/TopBar.css';
import { useDispatch } from 'react-redux';

export default function TopBar() {
	const score = useSelector(selectScore);
	const dispatch = useDispatch();

	return (
		<div className='top-bar flex-container'>
			<p className='score-display'>SCORE: {score}</p>
			<button onClick={() => dispatch(toggleKeyboard())}>
				<span>SHOW</span>
				<span>KEYBOARD</span>
			</button>
		</div>
	);
}
