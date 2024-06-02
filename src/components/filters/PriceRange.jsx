import ReactSlider from "react-slider";
import "./PriceRange.css";
import dorpdownIcon from "../../assets/dropdown-icon.png";
import { useState } from "react";
const PriceRange = function ({ priceRangeHandler }) {
  const [display, setDisplay] = useState(true);

  const togggleDisplayHandler = () => {
    setDisplay((prevDisplay) => !prevDisplay);
  };
  return (
    <div id="filter-price">
      <p className="price-range-title" onClick={togggleDisplayHandler}>
        Price Range{" "}
        <img
          className={
            display ? "dropdown-icon" : "dropdown-icon dropdown-icon-reverse"
          }
          src={dorpdownIcon}
        ></img>
      </p>
      <div className={display ? "filter-body-display" : "filter-body"}>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={0}
          max={1000}
          defaultValue={[0, 1000]}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          pearling
          minDistance={10}
          onAfterChange={priceRangeHandler}
        />
      </div>
    </div>
  );
};

export default PriceRange;
