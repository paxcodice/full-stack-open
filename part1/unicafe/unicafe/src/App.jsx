import { useState } from 'react';

const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const setToValue = (newValue) => {
		console.log('value now', newValue);
		setToValue(newValue);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={() => setGood(good + 1)} text={'good'} />
			<Button onClick={() => setNeutral(bad + 1)} text={'neutral'} />
			<Button onClick={() => setBad(neutral + 1)} text={'bad'} />
			<h1>statistics</h1>
			{good}
			{neutral}
			{bad}
		</div>
	);
};

export default App;
