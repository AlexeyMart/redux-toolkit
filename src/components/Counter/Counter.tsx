import { useSelector, useDispatch } from "react-redux";

// Styles
import "./Counter.css";

// Actions
import { increment, decrement } from "../../slices/counter";

// Selectors
import { counterSelector } from "../../selectors";

export default function Counter() {
  const value = useSelector(counterSelector);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="counter">
      <div>{value}</div>

      <div className="counter-buttons">
        <button onClick={handleIncrement}>Increment</button>

        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
}
