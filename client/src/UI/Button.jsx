/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Button = ({ children, style, type, className, onClick }) => {
  return (
    <button
      type="button"
      className={`bg-[#4C36C7] text-white rounded-lg hover:bg-[#6b51ff] ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
