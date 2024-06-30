import axios from "axios";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import "./ProductDetailsPage.css";
import { useRef, useState } from "react";
function ProductDetailsPage() {
  const ratingRef = useRef();
  const [ratingVal, setRatingVal] = useState(0);
  const location = useLocation();
  // const product = location.state.product;
  const reviewData = useLoaderData();
  const params = useParams();
  const { productId } = params;
  console.log("location", location);
  const queryParams = new URLSearchParams(location.search);
  const ratingChangeHandler = () => {
    setRatingVal(ratingRef.current.value);
  };
  return (
    <div className="product-details">
      <div>
        <h1>Product Details Page</h1>
        <img
          style={{ height: "100px", width: "100px" }}
          className="product-image"
          //src={`http://localhost:3000/${product._id}/tn.webp`}
          // alt={`image of tshirt ${product._id}`}
          src={`http://localhost:3000/${productId}/tn.webp`}
          alt={`image of tshirt ${productId}`}
        ></img>
        {/* <h4>Product Name: {product.name}</h4>
        <h4>Product Price: {product.price}</h4> */}
        <h4>Product Name: {queryParams.get("name")}</h4>
        <h4>Product Price: {queryParams.get("price")}</h4>
      </div>
      <div>
        <h1>Add Your Review</h1>
        <Form method="post">
          <p>{ratingVal}</p>
          <label for="starRating">Rating: </label>
          <input
            type="range"
            name="starRating"
            defaultValue={0}
            min={0}
            max={5}
            ref={ratingRef}
            onChange={ratingChangeHandler}
          ></input>
          <label for="comment">Review: </label>
          <input type="text" name="comment" style={{ height: "30px" }}></input>
          <button>Save</button>
        </Form>
        <h1>Reviews</h1>
        <ul>
          {reviewData.map((review) => (
            <li>
              <p>{review.userName}</p>
              <p>
                <p>{Array(review.starRating).fill("⭐").join("")}</p>
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function productReviewLoader({ request, params }) {
  console.log(request);
  console.log(params);
  const { productId } = params;
  try {
    const reviewData = await axios.get(
      `http://localhost:3000/item/reviews/${productId}`
    );
    return reviewData.data.reviews;
  } catch (error) {
    throw json(
      { message: "error while getting review data" },
      {
        status: 500,
      }
    );
  }
}
export async function sumbitReviewAction({ request, params }) {
  const { productId } = params;
  const formData = await request.formData();
  const comment = formData.get("comment");
  const starRating = formData.get("starRating");
  console.log(comment, starRating);
  const productReview = {
    productId,
    review: {
      userId: "abc@def.com",
      userName: "debjit ghosh",
      starRating,
      comment,
    },
  };
  axios.post("http://localhost:3000/item/review", productReview);
  // return redirect("/products");
  return null;
}

export default ProductDetailsPage;
