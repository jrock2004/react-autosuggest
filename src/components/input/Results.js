import React from 'react';

export const Results = ({ listItems, resultsEl }) => {
  return (
    <div className="mt-1 bg-white shadow-lg rounded-sm">
      <ul
        ref={resultsEl}
        tabIndex="-1"
        aria-labelledby="suggest-label"
        className="rounded-sm shadow-xs"
      >
        {listItems}
      </ul>
    </div>
  );
};

export default Results;
