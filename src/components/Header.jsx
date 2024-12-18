import { NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setNameSearch } from "../features/jewelery/jewelerySlice";

const Header = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const jewelerySearchHandler = (e) => {
    const { value } = e.target;

    dispatch(setNameSearch(value));
  };

  return (
    <header className="pt-2 fixed-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h2 className="">
            <NavLink to="/" className="logo text-decoration-none">
              JewelCraftCo
            </NavLink>
          </h2>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  pe-3">
              <li className="nav-item">
                <form className=" pt-2 " role="search ">
                  <input
                    className="form-control border-0"
                    type="search"
                    placeholder="Search by jewelery name..."
                    aria-label="Search"
                    onChange={jewelerySearchHandler}
                  />
                </form>
              </li>
              <li className="nav-item">
                <h2>
                  <NavLink to="/" className="link text-decoration-none">
                    Home
                  </NavLink>
                </h2>
              </li>

              <li className="nav-item ">
                <h2>
                  <NavLink
                    to="/jewellery"
                    className="link text-decoration-none"
                  >
                    All Jewelery
                  </NavLink>
                </h2>
              </li>
              <li className="nav-item ">
                <h2>
                  <NavLink
                    to="/wishlist"
                    className=" link text-decoration-none  ps-0 pe-1"
                  >
                    <CiHeart />
                  </NavLink>
                </h2>
              </li>
              <li className="nav-item ">
                <h2>
                  <div className="cart-icon">
                    <NavLink
                      to="/cart"
                      className="link text-decoration-none  px-0"
                    >
                      <IoCartOutline />
                    </NavLink>
                    {totalItems > 0 && (
                      <span className="cart-badge">{totalItems}</span>
                    )}
                  </div>
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
