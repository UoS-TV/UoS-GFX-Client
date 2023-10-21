import React, { useState, useContext } from "react";
import { UserContext } from "./context";
import GFXItem from "./GFXItem";
import { Button } from "react-bootstrap";

const initialList = [
  {
    id: "a",
    firstname: "Robin",
    lastname: "Wieruch",
    year: 1988,
  },
  {
    id: "b",
    firstname: "Dave",
    lastname: "Davidds",
    year: 1990,
  },
];

const DeletionTest = () => {
  const contexts = useContext(UserContext);

  const [list, setList] = React.useState(initialList);

  function handleRemove(id) {
    // remove item
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }

function handleAdd() {
    // add item
    const newList = list.push({
        id: "b",
        firstname: "Dave",
        lastname: "Davidds",
        year: 1990,
      })
      setList(newList)
    
}

  return <List list={list} onRemove={handleRemove} />;
};

const List = ({ list, onRemove }) => (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} onRemove={onRemove} />
      ))}
      <Button onClick={handleAdd}>Add</Button>
    </ul>
    
  );
  
  const Item = ({ item, onRemove }) => (
    <li>
      <span>{item.firstname}</span>
      <span>{item.lastname}</span>
      <span>{item.year}</span>
      <Button onClick={() => onRemove(item.id)}>
        Remove
      </Button>
    </li>
  );

export default DeletionTest;
