import React from "react";
import Select from "react-select";
import "./CustomSelect.css";

interface ICustomSelect {
  options: any[];
  handleChange: (newValue: any) => void;
  isLoading: boolean;
  value?: any;
  isSearchable: boolean;
  isClearable: boolean;
  placeholder: string;
  isDisabled: boolean;
}
const CustomSelect = (props: ICustomSelect) => {
  const {
    placeholder,
    handleChange,
    options,
    isClearable,
    isLoading,
    isSearchable,
    isDisabled,
  } = props;
  return (
    <div>
      <Select
        className="react-select-container"
        classNamePrefix="custom-select"
        styles={customStyles}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        isClearable={isClearable || false}
        isLoading={isLoading}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export const customStyles = {
  control: (provided: any, state: any) => ({
    width: "100%",
    background: state.isDisabled ? "#e8e6f2" : "#e9ddf8",
    border:
      state.isFocused || state.isHovered || state.menuIsOpen
        ? "1px solid #667ff"
        : "1px solid rgba(0, 0, 0, 0.23)",
    minHeight: "24px",
    "&:hover": { border: "1px solid  #000" },
    "&:focus": { border: "1px solid  #1976d2" },
    "&:active": { border: "1px solid  #1976d2" },
    "&:focus-within": { border: "1px  solid #1976d2" },
    borderRadius: "4px",
    display: "flex",
  }),

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    height: "24px",
    marginTop: "-2px",
    padding: "0 6px",
    "#custom-select__placeholder": {
      fontWeight: "normal",
      fontSize: "12px",
      display: state.isFocused ? "none" : "flex",
    },
    div: {
      fontSize: "11px",
    },
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    margin: "0px",
    paddingTop: "2px",
    fontFamily: "san serif",
    marginBottom: "8px",
  }),
  indicatorSeparator: (state: any) => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    height: "24px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontFamily: "san serif",
    fontSize: "12px",
    zIndex: 100000,
  }),
};
export default CustomSelect;
