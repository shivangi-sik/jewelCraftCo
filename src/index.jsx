import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Jewellery from "./features/jewelery/Jewellery";
import JewelleryDetails from "./features/jewelery/JewelleryDetails";
import store from "./store";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Wishlist from "./features/wishlist/WishList";
import Cart from "./features/cart/Cart";
import AddressForm from "./features/address/AddressForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/jewellery",
    element: <Jewellery />,
  },
  {
    path: "/jewellery/:jewelleryId",
    element: <JewelleryDetails />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/update-address/:addressId",
    element: <AddressForm />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Slide
        style={{ zIndex: 10500 }}
      />
    </Provider>
  </React.StrictMode>
);
