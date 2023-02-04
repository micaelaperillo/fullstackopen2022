import { useState } from 'react'

function StatsLine(props) {
  return (
    <p>{props.text} {props.value}</p>
  );
}

const Statistics = (props) => {
  let stats;
  const average = props.good - props.bad
  const positive = props.good / (props.good + props.neutral + props.bad) * 100
  const all = props.good + props.neutral + props.bad
  if (all > 0) {
    stats = (
      <div className="results">
        <table>
          <tbody>
            <StatsLine text="good" value={props.good} />
            <StatsLine text="neutral" value={props.neutral} />
            <StatsLine text="bad" value={props.bad} />
            <StatsLine text="all" value={all} />
            <StatsLine text="average" value={average} />
            <StatsLine text="positive" value={positive + " %"} />
          </tbody>
        </table>
      </div>
    );
  } else {
    stats = (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div className='stats'>
      <h1>statistics</h1>
      {stats}
    </div>
  );

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div className='containter'>
      <div>
        <h1>give feedback</h1>
        <div className='btns'>
          <button onClick={handleGoodClick}>good</button>
          <button onClick={handleNeutralClick}>neutral</button>
          <button onClick={handleBadClick}>bad</button>
        </div>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App