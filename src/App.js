import React, { useState } from 'react';

import './styles.css';
import customers from './data/customers';

import { InputSuggest } from './components/input/InputSuggest';
import SelectedCustomer from './components/SelectedCustomer';

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

  const handleReset = () => {
    setState({
      ...state,
      selectedItem: {},
    });
  };

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
        <div className="border-t mt-6 pt-6 flex flex-col items-center justify-center">
          <SelectedCustomer selectedItem={state.selectedItem} />

          {state.selectedItem.firstName && (
            <div className="mt-6">
              <button className="border bg-teal-700 text-white px-3 py-1" onClick={handleReset}>
                Reset
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
