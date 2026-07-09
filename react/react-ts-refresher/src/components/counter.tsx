import * as React from "react";
import "./Counter.css"; // import the styles

function Counter({playerName}: {playerName: string}) {
  const [count, setCount] = React.useState<number>(0);

  console.log(`Increment ${playerName} ${count}`);

  function handleIncrement() {
    if (count >= 100) {
        setCount(0)
    } else {
        setCount(count + 1)
    }
  }

  function handleDecrement() {
    if (count != 0) {
        setCount(count - 1)
    }
  }

  return (
    <div className="counter-container">
      <h1>{playerName}</h1>
      <h1 className="count-display">Count is {count}</h1>
      <div className="button-group">
        <button
          className="btn btn-increment"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="btn btn-decrement"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;