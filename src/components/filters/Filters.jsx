import PriceRange from "./PriceRange";
import ButtonWrapper from "../ButtonWrapper";
import "./Filters.css";
function Filters({ setPriceRangeHandler, filterHandler }) {
  return (
    <div id="filter-section">
      <PriceRange priceRangeHandler={setPriceRangeHandler} />
      <div id="filter-button">
        <ButtonWrapper clickHandler={filterHandler}>Filter</ButtonWrapper>
      </div>
    </div>
  );
}

export default Filters;
