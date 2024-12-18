import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import {
  fetchCart,
  removeCartItemAsync,
  updateCartItemAsync,
} from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Addresses from "../address/Addresses";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, status, error } = useSelector((state) => state.cart);
  const { selectedAddress } = useSelector((state) => state.addresses);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, cartItems]);

  const cartItemDeleteHandler = (event) => {
    const jewelleryId = event.currentTarget.id;
    console.log(jewelleryId);
    dispatch(removeCartItemAsync(jewelleryId));
  };

  const itemsQuantityHandler = (event) => {
    const updatedQuantity = event.target.value;
    const updatedData = cartItems.reduce((acc, curr) => {
      if (curr._id === event.target.name) {
        acc = { ...curr, quantity: updatedQuantity };
      }
      return acc;
    }, {});
    if (updatedQuantity <= 0) {
      dispatch(removeCartItemAsync(updatedData._id));
    } else {
      dispatch(updateCartItemAsync(updatedData));
    }
  };

  const totalMRP = cartItems.reduce(
    (acc, curr) => acc + curr.mrp * curr.quantity,
    0
  );
  const totalDisount = cartItems.reduce(
    (acc, curr) => acc + curr.mrp * 0.01 * curr.discount * curr.quantity,
    0
  );

  const totalCartPrice = cartItems.reduce(
    (acc, curr) =>
      (acc += (curr.mrp - curr.mrp * curr.discount * 0.01) * curr.quantity),
    0
  );

  return (
    <div>
      <Header />
      <main className="py-5 mt-5">
        <h1 className="text-center main-text pt-4">My Cart</h1>
        {status === "Loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {cartItems.length > 0 ? (
          <div>
            <nav
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              className="bg-breadcrumb pb-1 pt-2 "
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
                    to="/cart"
                  >
                    Cart
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="container-fluid">
              <div className="row ">
                <div className="col-md-9  border-end">
                  <div className="my-3 address-sec rounded p-3">
                    <div className="d-flex justify-content-between">
                      {selectedAddress && (
                        <div className="">
                          Deliver to:{" "}
                          <strong>
                            {selectedAddress.name},{" "}
                            {selectedAddress.address?.pinCode}
                          </strong>
                          <br />
                          <small>
                            {selectedAddress.address?.houseNo},{" "}
                            {selectedAddress.address?.locality},{" "}
                            {selectedAddress.address?.city}
                          </small>
                        </div>
                      )}
                      <div>
                        <button
                          className="border-1 rounded p-2 address-btn fw-medium me-3"
                          data-bs-toggle="modal"
                          data-bs-target="#addressModal"
                        >
                          Change Address
                        </button>
                        <Addresses />
                      </div>
                    </div>
                  </div>
                  <div className="row bg-body-tertiary py-2 mb-2 border-bottom border-2">
                    <div className="col-md-6 col-9">PRODUCTS</div>
                    <div className="col-md-2 col-2">PRICE</div>
                    <div className="col-md-2">QUANTITY</div>
                    <div className="col-md-1">TOTAL</div>
                    <div className="col-md-1"></div>
                  </div>
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item._id} className="py-1">
                        <div className="card rounded-0 border border-grey border-2">
                          <div className="card-body row">
                            <div className="col-md-6 col-9 d-flex align-items-center ">
                              <div className="square-wrapper me-4">
                                {" "}
                                <img src={item.imageUrl} />{" "}
                              </div>
                              <span>{item.name}</span>
                            </div>
                            <div className="col-md-2 col-2 d-flex align-items-center">
                              ${item.mrp - item.mrp * item.discount * 0.01}
                            </div>
                            <div className="col-md-2 d-flex align-items-center">
                              <input
                                style={{ width: "80px" }}
                                type="number"
                                className="text-center "
                                defaultValue={item.quantity}
                                name={item._id}
                                onChange={itemsQuantityHandler}
                              />
                            </div>
                            <div className="col-md-1 d-flex align-items-center">
                              $
                              {item.quantity *
                                (item.mrp - item.mrp * item.discount * 0.01)}
                            </div>
                            <div className="col-md-1 col-1 d-flex align-items-center ">
                              <button
                                className="btn"
                                id={item._id}
                                onClick={cartItemDeleteHandler}
                              >
                                <RiDeleteBin6Line className="text-danger" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="col-md-3  ">
                  <div className=" py-2 border-bottom border-2 border-black fw-bold">
                    ORDER SUMMARY
                  </div>
                  <div className="  px-2 my-3 ">
                    <div className="d-flex justify-content-between">
                      <div>Total Mrp: </div> <div>${totalMRP} </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div>Discount on Mrp: </div>{" "}
                      <div className="text-danger">-${totalDisount}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between border-top border-2 py-3 px-2 my-3 ">
                    <div>TOTAL: </div>{" "}
                    <div className="text-success">${totalCartPrice}</div>
                  </div>
                  <div>
                    <button className="primary-btn fw-medium text-light w-100 py-2 rounded">
                      PLACE ORDER
                    </button>
                    <Link
                      to="/jewellery"
                      className="d-block text-decoration-none fw-medium my-2 py-2 rounded bg-tertiary border-0 secondary-btn text-center"
                    >
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img
              className=""
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
            />
            <p className="text-secondary fs-1">
              <strong>
                Your Cart is <span className="text-prim">Empty!</span>
              </strong>
            </p>
            <p className="text-secondary fw-medium">
              Must add items to cart before you proceed to checkout.
            </p>
            <Link
              to="/jewellery"
              className="primary-btn px-3 py-2 text-decoration-none text-light fw-medium rounded"
            >
              Return to Shop
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
