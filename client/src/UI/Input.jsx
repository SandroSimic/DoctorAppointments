/* eslint-disable react/prop-types */
const Input = ({ type, placeholder, className, selectOptions, value, onChange }) => {
  if (type === "select") {
    return (
      <select
        className={`border-2 w-60 h-10 p-1 rounded-lg ${
          className ? className : ""
        }`}
        value={value}
        onChange={onChange}
      >
        {selectOptions.map((selectOption, index) => (
          <option key={index}>{selectOption}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-2 w-60 h-10 p-3 rounded-lg ${
        className ? className : ""
      }`}
    />
  );
};

export default Input;
