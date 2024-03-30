import ReactSlider from "react-slider";
import "./PriceRange.css";

const PriceRange = function ( {priceRangeHandler} ) {
  return (
    <div id="filter-price">
      <p className="price-range-title">PRICE RANGE</p>
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
  );
};

export default PriceRange;