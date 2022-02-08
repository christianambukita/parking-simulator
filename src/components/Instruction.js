import React from 'react';
import '../css/Instruction.css';
import '../css/keys.css';

export default function Instrucion() {
	return (
		<div className='instruction-container flex-container'>
			<div className='flex-container i-top'>
				<p className='i-text-big'>USE</p>

				<div className='keys'>
					{['k-top', 'k-right', 'k-bottom', 'k-left'].map((key) => (
						<div className={`key flex-container ${key}`} key={key}>
							<div className='arrow-container flex-container'>
								<div className='arrow-head'></div>
								<div className='arrow-body'></div>
							</div>
						</div>
					))}
				</div>
			</div>
			<p className='i-text'>TO MOVE AROUND</p>
		</div>
	);
}
