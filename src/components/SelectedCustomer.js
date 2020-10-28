import React from 'react';

export const SelectedCustomer = ({ selectedItem }) => {
  const { firstName, lastName, email, phone } = selectedItem;

  if (firstName) {
    return (
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
  } else {
    return null;
  }
};

export default SelectedCustomer;
