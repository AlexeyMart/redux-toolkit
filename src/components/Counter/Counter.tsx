import { useAppSelector, useAppDispatch } from "../../hooks";

// Styles
import "./Counter.css";

// Actions, Selectors
import { increment, decrement, counterSelector } from "../../slices/counter";

export default function Counter() {
  const value = useAppSelector(counterSelector);

  const dispatch = useAppDispatch();

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
