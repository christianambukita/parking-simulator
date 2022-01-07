import React from 'react';
import '../css/Instruction.css';

export default function Instrucion() {
	return (
		<div className='instruction flex-container'>
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
