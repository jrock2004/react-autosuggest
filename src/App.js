import React, { useState } from "react";

import "./styles.css";
import customers from "./data/customers";

import { InputSuggest } from "./InputSuggest";

export default function App() {
  const [state, setState] = useState({
    customers: customers,
    selectedItem: {}
  });

  const handleClick = (item) => {
    setState({
      ...state,
      selectedItem: item
    });
  };

  let selectedItemComponent = null;

  if (state.selectedItem.firstName) {
    const { firstName, lastName, phone } = state.selectedItem;

    selectedItemComponent = (
      <div>
        <h3>Selected Item</h3>
        <ul>
          <li>{firstName}</li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <header className="bg-black text-white px-4 py-2">
        <h1 className="text-2xl">Customer Manager</h1>
      </header>
      <main className="px-4 py-8">
        <div className="flex justify-center">
          <InputSuggest
            suggestions={state.customers}
            label="Search Customers"
            handleClick={handleClick}
          />
        </div>
        <div>{selectedItemComponent}</div>
      </main>
    </>
  );
}
