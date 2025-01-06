import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IoMdHeart } from "react-icons/io";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJeweleryDetailAsync } from "./jewelerySlice";
import {
  addWishItemAsync,
  fetchWishlist,
  removeWishItemAsync,
} from "../wishlist/wishlistSlice";
import {
  addCartItemAsync,
  fetchCart,
  updateCartItemAsync,
} from "../cart/cartSlice";
import SizeChart from "./SizeChart";
import DeliveryAndReturn from "./DeliveryAndReturn";

const JewelleryDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { jewelDetail } = useSelector((state) => state.jewelery);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { jewelleryId } = useParams();
  const isItemInWishlist = wishlist.some((item) => item._id === jewelleryId);
  const { cartItems, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchJeweleryDetailAsync(jewelleryId));
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch, jewelleryId]);

  const quantityHandller = (event) => {
    setQuantity(event.target.value);
  };

  const cartHandler = async () => {
    const cartItemIndex = cartItems.findIndex(
      (item) => item._id === jewelleryId
    );
    if (cartItemIndex >= 0) {
      dispatch(
        updateCartItemAsync({
          ...cartItems[cartItemIndex],
          quantity: cartItems[cartItemIndex].quantity + 1,
        })
      );
    } else {
      dispatch(addCartItemAsync({ ...jewelDetail, quantity: quantity }));
    }
  };

  const wishlistHandler = () => {
    if (isItemInWishlist) {
      dispatch(removeWishItemAsync(jewelleryId));
    } else {
      dispatch(addWishItemAsync(jewelDetail));
    }
  };

  return (
    <div>
      <Header />
      <main className="margin ">
        <div className="text-center py-4 container">
          <h3 className="main-text">
            <strong>{jewelDetail.name}</strong> - {jewelDetail.description}
          </h3>
        </div>

        <nav
          style={{ "--bs-breadcrumb-divider": "'>'" }}
          className="bg-breadcrumb py-1 "
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb container">
            <li className="breadcrumb-item ">
              <Link className="text-decoration-none breadcrumb-link" to="/">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                className="text-decoration-none breadcrumb-link"
                to="/jewellery"
              >
                Jewellery
              </Link>
            </li>
          </ol>
        </nav>

        <div className="container">
          {" "}
          <div className="row ">
            <div className="col-md-5">
              <img className="img-fluid" src={jewelDetail.imageUrl} />
            </div>

            <div className="col-md-7 ">
              <div className="mt-3">
                <h3>
                  {" "}
                  <span className="text-decoration-line-through text-secondary fs-4">
                    MRP ${jewelDetail.mrp}
                  </span>{" "}
                  <span className="fs-3">
                    $
                    {jewelDetail.mrp -
                      jewelDetail.mrp * 0.01 * jewelDetail.discount}
                  </span>{" "}
                  <span className="fs-4 text-danger">
                    ({jewelDetail.discount}% OFF)
                  </span>
                </h3>
              </div>
              <div className="d-flex  row  my-4">
                <div className="col-2 mb-2 ">
                  {" "}
                  <select
                    onChange={quantityHandller}
                    className="form-select py-2 border border-danger-subtle "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="col-md-10  ">
                  <div className="row ">
                    <button
                      className="primary-btn rounded text-light py-2 px-4 border-0 col-6 ms-2 "
                      onClick={cartHandler}
                    >
                      {" "}
                      Add to Bag
                    </button>

                    <button
                      onClick={wishlistHandler}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="bg-body-tertiary p-2 px-3 rounded border border-1 ms-3 text-danger col-auto"
                    >
                      <IoMdHeart
                        className="heart"
                        style={{
                          transition: " color 0.3s ease",
                          color: isHovered
                            ? "#921A40"
                            : isItemInWishlist
                            ? "#921A40"
                            : "grey",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex my-4">
                <button
                  className="border-0 bg-white text-prim fw-medium me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#sizeModal"
                >
                  Size Chart
                </button>
                <SizeChart />
                <button
                  className="border-0 bg-white text-prim fw-medium me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#deliveryModal"
                >
                  Delivery & Return
                </button>
                <DeliveryAndReturn />
              </div>

              <div>
                <p>
                  Availability:{" "}
                  {jewelDetail.stockQuantity > 0 ? (
                    <span className="text-success">In stock</span>
                  ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
                </p>
                <p>
                  Dispatch Time:{" "}
                  <span className="text-secondary">
                    {jewelDetail.dispatchTime}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JewelleryDetails;
