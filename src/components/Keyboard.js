import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Keyboard.css';
import '../css/keys.css';
import { selectShowKeyboard } from './redux/AppSlice';
import { setKey } from './redux/SceneSlice';

export default function Keyboard({ scale }) {
	const showKeyboard = useSelector(selectShowKeyboard);
	const getStyle = () => (showKeyboard ? {} : { display: 'none' });
	const dispatch = useDispatch();

	return (
		<div id='keyboard' style={getStyle()}>
			<div className='keys'>
				{[
					{ key: 'k-top', event: 'ArrowUp' },
					{ key: 'k-right', event: 'ArrowRight' },
					{ key: 'k-bottom', event: 'ArrowDown' },
					{ key: 'k-left', event: 'ArrowLeft' },
				].map((key) => (
					<div
						className={`key flex-container ${key.key}`}
						key={`screen-keyboard-${key.event}`}
						onMouseDown={() =>
							dispatch(setKey({ key: key.event, press: true }))
						}
						onPointerDown={() =>
							dispatch(setKey({ key: key.event, press: true }))
						}
						onMouseUp={() => dispatch(setKey({ key: key.event, press: false }))}
						onMouseLeave={() =>
							dispatch(setKey({ key: key.event, press: false }))
						}
						onPointerUp={() =>
							dispatch(setKey({ key: key.event, press: false }))
						}
						onPointerLeave={() =>
							dispatch(setKey({ key: key.event, press: false }))
						}>
						<div className='arrow-container flex-container'>
							<div className='arrow-head'></div>
							<div className='arrow-body'></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
