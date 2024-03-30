import "./ButtonWrapper.css";
const ButtonWrapper = ({ children, clickHandler, customClassName }) => {
  return (
    <button
      className={(customClassName ? customClassName + " " : "") + "button-wrapper"}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default ButtonWrapper;
