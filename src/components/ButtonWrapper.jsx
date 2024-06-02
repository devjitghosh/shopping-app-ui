import "./ButtonWrapper.css";
const ButtonWrapper = ({ children, clickHandler, customClassName }) => {
  return (
    <button
      className={
        (customClassName ? customClassName + " " : "") + "button-wrapper"
      }
      onClick={clickHandler}
    >
      <p className="button-title">{children}</p>
    </button>
  );
};

export default ButtonWrapper;
