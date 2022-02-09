import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Keyboard.css';
import '../css/keys.css';
import { selectShowKeyboard } from './redux/AppSlice';
import { setKey } from './redux/SceneSlice';

const minHeight = 0.66; //of vw
const minWidth = 1; //of vh

export default function Keyboard({ scale }) {
	const [keyboardScale, setScale] = useState(1);
	const showKeyboard = useSelector(selectShowKeyboard);
	const keyboardRef = useRef(null);
	const getStyle = () => (showKeyboard ? {} : { display: 'none' });
	const dispatch = useDispatch();
	const getMargin = () => (scale.wide ? 'marginLeft' : 'marginTop');
	useEffect(() => {
		const { width, height } = keyboardRef.current.getBoundingClientRect();
		const wHeight = window.innerHeight;
		const wWidth = window.innerWidth;
		const heightScale = width * minHeight;
		const widthScale = height * minWidth;
		if (wWidth > wHeight && width < widthScale) setScale(width / widthScale);
		if (wHeight > wWidth && height < heightScale)
			setScale(height / heightScale);
	}, [keyboardRef, scale, showKeyboard]);

	return (
		<div
			ref={keyboardRef}
			id='keyboard'
			style={{ '--keyboard-scale': keyboardScale, [getMargin()]: '30em' }}>
			<div className='keys' style={getStyle()}>
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
