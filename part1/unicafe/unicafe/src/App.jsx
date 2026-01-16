import { useState } from 'react';

const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
	const positive = total === 0 ? 0 : (good / total) * 100;

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={() => setGood(good + 1)} text={'good'} />
			<Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
			<Button onClick={() => setBad(bad + 1)} text={'bad'} />
			<h1>statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {total}</p>
			<p>average {average}</p>
			<p>positive {positive}</p>
		</div>
	);
};

export default App;
