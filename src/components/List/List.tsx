import { useState, ChangeEvent } from "react";
import { connect, ConnectedProps } from "react-redux";

// Styles
import "./List.css";

// Actions
import { add, remove } from "../../slices/list";

// Selectors
import { listSelector } from "../../selectors";

// Types
import { RootState } from "../../store";

function List({ items, add, remove }: PropsFromRedux) {
  const [item, setItem] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setItem(event.target.value);

  const handleAddItem = () => {
    if (!item) {
      return;
    }

    add(item);

    setItem("");
  };

  const renderItem = (item: string, index: number) => {
    const handleRemove = () => remove(item);

    return (
      <div key={index} className="list-item">
        <div>{item}</div>

        <button onClick={handleRemove}>remove</button>
      </div>
    );
  };

  return (
    <div className="list">
      <div>
        <input value={item} onChange={handleChange} />

        <button onClick={handleAddItem}>Add item</button>
      </div>

      <div>{items.map(renderItem)}</div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  items: listSelector(state),
});

const mapDispatchToProps = {
  add,
  remove,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(List);
