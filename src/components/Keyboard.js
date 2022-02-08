import React from 'react';
import { useSelector } from 'react-redux';
import '../css/Keyboard.css';
import '../css/keys.css';
import { selectShowKeyboard } from './redux/AppSlice';

export default function Keyboard() {
	const showKeyboard = useSelector(selectShowKeyboard);
	const getStyle = () => (showKeyboard ? {} : { display: 'none' });

	return (
		<div id='keyboard' style={getStyle()}>
			<div className='keys'>
				<div className='key k-top flex-container'>
					<div className='arrow-container flex-container'>
						<div className='arrow-head'></div>
						<div className='arrow-body'></div>
					</div>
				</div>
				<div className='key k-right flex-container'>
					<div className='arrow-container flex-container'>
						<div className='arrow-head'></div>
						<div className='arrow-body'></div>
					</div>
				</div>
				<div className='key k-bottom flex-container'>
					<div className='arrow-container flex-container'>
						<div className='arrow-head'></div>
						<div className='arrow-body'></div>
					</div>
				</div>
				<div className='key k-left flex-container'>
					<div className='arrow-container flex-container'>
						<div className='arrow-head'></div>
						<div className='arrow-body'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
