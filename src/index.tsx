import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface IProps {
	value: Number
}

export const Counter = (value: string) => {
	return (
		<div>
		Hi Ts, {value}.
		</div>
	)
}