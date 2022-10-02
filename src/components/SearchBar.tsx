import React from "react";
import CustomSearchBar from "./CustomSearchBar";

interface ISearchBar {
  title: string;
  setTitle: (newTitle: string) => void;
}
const SearchBar = (props: ISearchBar) => {
  return (
    <div className="grid grid-cols-4 justify-around">
      <div>
        <CustomSearchBar value={props.title} onChange={props.setTitle} />
      </div>
    </div>
  );
};

export default SearchBar;
