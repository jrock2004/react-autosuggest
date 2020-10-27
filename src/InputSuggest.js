import React, { useCallback, useEffect, useRef, useState } from "react";

export const InputSuggest = ({ label, suggestions, handleClick }) => {
  const inputEl = useRef(null);
  const listItemEl = useRef(null);
  const resultsEl = useRef(null);

  const [state, setState] = useState({
    value: "",
    suggestions: suggestions,
    filteredList: []
  });

  const handleUserKeyPress = useCallback((event) => {
    const { keyCode } = event;
    const currentElement = document.activeElement;
    const elementType = currentElement.tagName;

    console.log(keyCode);

    switch (keyCode) {
      case 40: // Down
        if (elementType === "INPUT") {
          let resultList = resultsEl.current.getElementsByTagName("li");

          resultList[0].focus();
        } else {
          let next = currentElement.nextSibling;

          if (next) {
            next.focus();
          }
        }

        break;
      case 38: // Up
        if (elementType !== "INPUT") {
          let next = currentElement.previousSibling;

          if (next) {
            next.focus();
          } else {
            //TODO: Need to figure how to set cursor to the end
            inputEl.current.focus();
          }
        }

        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const Results = () => {
    if (state.filteredList.length > 0) {
      const listItems = state.filteredList.map((item) => (
        <ListItem key={item.id} item={item} />
      ));

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
    } else {
      return null;
    }
  };

  const ListItem = ({ item }) => {
    return (
      <li
        role="button"
        ref={listItemEl}
        tabIndex="0"
        className="text-gray-900 cursor-pointer relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600 focus:text-white focus:bg-indigo-600"
        onClick={(e) => handleListClick(item, e)}
      >
        {item.firstName}
      </li>
    );
  };

  const handleChange = (event) => {
    const value = event.target.value,
      searchValue = value ? value.toLowerCase() : "";

    let filteredList = [];

    if (searchValue !== "") {
      filteredList = state.suggestions.filter((sug) => {
        let shouldReturn = false;

        for (const [key, keyValue] of Object.entries(sug)) {
          if (
            key !== "id" &&
            keyValue.toLowerCase().indexOf(searchValue) > -1
          ) {
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
      filteredList: filteredList
    });
  };

  const handleListClick = (item) => {
    setState({
      ...state,
      value: "",
      filteredList: []
    });

    handleClick(item);
  };

  return (
    <div className="flex flex-col w-1/4">
      <label
        id="suggest-label"
        className="text-sm leading-5 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="border rounded-sm px-3 py-1 shadow-sm"
        ref={inputEl}
        value={state.value}
        onChange={handleChange}
      />

      <Results />
    </div>
  );
};
