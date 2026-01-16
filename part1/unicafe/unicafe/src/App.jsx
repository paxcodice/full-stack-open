import { useState } from 'react';

const Button = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistics = (props) => {
	return (
		<>
			<p>good {props.good}</p>
			<p>neutral {props.neutral}</p>
			<p>bad {props.bad}</p>
			<p>all {props.total}</p>
			<p>average {props.average}</p>
			<p>positive {props.positive}</p>
		</>
	);
};

const StatisticLine = (props) => {
	return (
		<p>
			{props.text} {props.value} {props.unit}
		</p>
	);
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
			{total > 0 ? (
				<>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={total} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positive} unit="%" />
				</>
			) : (
				'No feedback given'
			)}
		</div>
	);
};

export default App;
