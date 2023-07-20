import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <td>{props.text} {props.value}</td>
  )
}

const Statistics = ({good, neutral, bad}) => {
  /* condtional rendering */
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const all = good + neutral + bad;
  /* save two decimal places when calculate average */
  /* two decimal for average */

  const average = ((good - bad) / all).toFixed(2);
  const positive = (good / all * 100).toFixed(2) + '%';
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value ={good}/>
        </tr>
        <tr>
          <StatisticLine text="neutral" value ={neutral}/>
        </tr>
        <tr>
          <StatisticLine text="bad" value ={bad}/>
        </tr>
        <tr>
          <StatisticLine text="all" value ={all}/>
        </tr>
        <tr>
          <StatisticLine text="average" value ={average}/>
        </tr>
        <tr>
          <StatisticLine text="positive" value ={positive}/>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (e) =>{
    console.log('clicked')
    /* set state */
    if (e.target.textContent === 'good') {
      setGood(good + 1)
    } else if (e.target.textContent === 'neutral') {
      setNeutral(neutral + 1)
    } else if (e.target.textContent === 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header course="give feedback" />
      <Button 
        text="good" 
        handleClick={handleClick}
      />
      <Button 
        text="neutral" 
        handleClick={handleClick}
      />
      <Button 
        text="bad" 
        handleClick={handleClick}
      />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
