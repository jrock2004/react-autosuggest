import React, { useState } from 'react';

import './styles.css';
import customers from './data/customers';

import { InputSuggest } from './InputSuggest';

export default function App() {
  const [state, setState] = useState({
    customers: customers,
    selectedItem: {},
  });

  const handleClick = (item) => {
    setState({
      ...state,
      selectedItem: item,
    });
  };

  let selectedItemComponent = null;

  if (state.selectedItem.firstName) {
    const { firstName, lastName, email, phone } = state.selectedItem;

    selectedItemComponent = (
      <div className="border rounded-sm w-1/4 shadow-lg">
        <header className="bg-orange-700 text-white px-4 py-2">
          <h3>Selected Item</h3>
        </header>
        <div className="px-4 py-2">
          <div className="flex justify-between">
            <span>
              {firstName} {lastName}
            </span>
            <span>{phone}</span>
          </div>
          <div className="mt-4 text-gray-700 text-sm">
            <span>{email}</span>
          </div>
        </div>
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
        <div className="border-t mt-6 pt-6 flex justify-center">{selectedItemComponent}</div>
      </main>
    </>
  );
}
