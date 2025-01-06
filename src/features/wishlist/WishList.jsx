import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect } from "react";
import { fetchWishlist, removeWishItemAsync } from "./wishlistSlice";
import { IoMdRemove } from "react-icons/io";

import { Link } from "react-router-dom";
import {
  addCartItemAsync,
  fetchCart,
  updateCartItemAsync,
} from "../cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist, status, error } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, [dispatch]);

  const cartHandler = (e) => {
    const jewelleryId = e.target.value;
    const jewel = wishlist.reduce((acc, curr) => {
      if (curr._id === jewelleryId) {
        acc = curr;
      }
      return acc;
    }, {});

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
      dispatch(addCartItemAsync({ ...jewel, quantity: 1 }));
    }
  };

  const removeHandler = (e) => {
    const jewelId = e.currentTarget.value; //currentTarget: refers to the element to which the event handler is attached. target: will refer to the child element (<IoMdRemove />)

    dispatch(removeWishItemAsync(jewelId));
  };

  return (
    <div>
      <Header />
      <main className="mt-5 py-5">
        <h1 className="text-center main-text py-3">Wishlist</h1>
        {status === "Loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {wishlist.length > 0 ? (
          <div>
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
                    to="/wishlist"
                  >
                    Wishlist
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="container-fluid my-3">
              <div className="row bg-body-tertiary py-2 border-bottom border-2">
                <div className="col-2 fw-bold text-secondary text-center">
                  IMAGE
                </div>
                <div className="col-4 fw-bold text-secondary text-center">
                  PRODUCT NAME
                </div>
                <div className="col-2 fw-bold text-secondary text-center">
                  PRICE
                </div>
                <div className="col-2 fw-bold text-secondary text-center">
                  ADD
                </div>
                <div className="col-2 fw-bold text-secondary text-center">
                  REMOVE
                </div>
              </div>
              <ul className="py-2 list-unstyled">
                {wishlist?.map((item) => (
                  <li
                    key={item._id}
                    className="row border-bottom py-2 border-2 align-items-center"
                  >
                    <div className=" col-2 d-flex ">
                      <div className="square-wrapper mx-auto d-block">
                        {" "}
                        <img className="" src={item.imageUrl} />
                      </div>
                    </div>

                    <div className="col-4 text-center">{item.name}</div>

                    <div className="col-2 text-center">
                      ${item.mrp - item.mrp * item.discount * 0.01}
                    </div>
                    <div className="col-2 ">
                      <button
                        value={item._id}
                        className="btn button bg-body-tertiary px-4 mx-auto d-block"
                        onClick={cartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>

                    <div className="col-2">
                      <button
                        className="btn mx-auto d-block"
                        value={item._id}
                        onClick={removeHandler}
                      >
                        <IoMdRemove className=" bg-danger text-light" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <img
                className=""
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-shopping-site-ecommerce-marketplace-states-pack-windows-interface-illustrations-9824483.png"
              />
              <p className="text-secondary  py-2 fs-1">
                <strong>You haven't saved anything yet!</strong>
              </p>
              <Link
                to="/jewellery"
                className="rounded primary-btn px-3 py-2 text-light text-decoration-none fw-medium"
              >
                Save Now
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
