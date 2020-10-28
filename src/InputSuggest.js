import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import ListItem from './components/input/ListItem';
import Results from './components/input/Results';

export const InputSuggest = ({ label, suggestions, handleClick }) => {
  const inputEl = useRef(null);
  const listItemEl = useRef(null);
  const resultsEl = useRef(null);

  const [state, setState] = useState({
    value: '',
    suggestions: suggestions,
    filteredList: [],
  });

  const handleUserKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;
      const currentElement = document.activeElement;
      const elementType = currentElement.tagName;

      switch (keyCode) {
        case 40: // Down
          if (elementType === 'INPUT') {
            let resultList = resultsEl.current.getElementsByTagName('li');

            resultList[0].focus();
          } else {
            let next = currentElement.nextSibling;

            if (next) {
              next.focus();
            }
          }

          break;
        case 38: // Up
          if (elementType !== 'INPUT') {
            let next = currentElement.previousSibling;

            if (next) {
              next.focus();
            } else {
              //TODO: Need to figure how to set cursor to the end
              inputEl.current.focus();
            }
          }

          break;
        case 27: // Escape
          setState({
            ...state,
            filteredList: [],
          });

          break;
        default:
          break;
      }
    },
    [state]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const ResultsList = () => {
    if (state.filteredList.length > 0) {
      const listItems = state.filteredList.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          listItemEl={listItemEl}
          handleListClick={handleListClick}
        />
      ));

      return <Results listItems={listItems} resultsEl={resultsEl} />;
    } else {
      return null;
    }
  };

  const handleChange = (event) => {
    const value = event.target.value,
      searchValue = value ? value.toLowerCase() : '';

    let filteredList = [];

    if (searchValue !== '') {
      filteredList = state.suggestions.filter((sug) => {
        let shouldReturn = false;

        for (const [key, keyValue] of Object.entries(sug)) {
          if (key !== 'id' && keyValue.toLowerCase().indexOf(searchValue) > -1) {
            shouldReturn = true;
          }
        }

        if (shouldReturn) {
          return sug;
        } else {
          return null;
        }
      });
    }

    setState({
      ...state,
      value: value,
      filteredList: filteredList,
    });
  };

  const handleListClick = (item) => {
    setState({
      ...state,
      value: '',
      filteredList: [],
    });

    handleClick(item);
  };

  const handleFocus = () => {
    if (state.value === '') {
      setState({
        ...state,
        filteredList: suggestions,
      });
    }
  };

  return (
    <div className="flex flex-col w-1/4">
      <label id="suggest-label" className="text-sm leading-5 font-medium text-gray-700">
        {label}
      </label>
      <input
        className="border rounded-sm px-3 py-1 shadow-sm"
        ref={inputEl}
        value={state.value}
        onFocus={handleFocus}
        onChange={handleChange}
      />

      <ResultsList />
    </div>
  );
};

InputSuggest.propTypes = {
  label: PropTypes.string,
  suggestions: PropTypes.array,
  handleClick: PropTypes.func,
};
