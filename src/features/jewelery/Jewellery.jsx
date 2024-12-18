import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJewelery,
  setFilteredData,
  setPriceRange,
  setSelectedCategories,
  setSelectedRating,
  setSortBy,
  setSortedData,
  toggleSelectedCatgories,
} from "./jewelerySlice";
import { addCartItemAsync, updateCartItemAsync } from "../cart/cartSlice";

const Jewellery = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const { jewelery, filters, status, error, filteredData, sortedData, sortBy } =
    useSelector((state) => state.jewelery);

  const { priceRange, selectedCategories, selectedRating, nameSearch } =
    filters;
  const { cartItems } = useSelector((state) => state.cart);

  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("filter");

  const filterFunction = (
    priceFilter,
    categoryFilter,
    ratingFilter,
    nameSearch
  ) => {
    return jewelery.filter(
      (jewel) =>
        (!priceFilter ||
          jewel.mrp - jewel.mrp * jewel.discount * 0.01 <= priceFilter) &&
        (!ratingFilter || jewel.rating >= parseInt(ratingFilter)) &&
        (categoryFilter.length === 0 ||
          categoryFilter.includes(jewel.category)) &&
        (!nameSearch ||
          jewel.name.toLowerCase().includes(nameSearch.toLowerCase()))
    );
  };

  // useEffect to fetch jewelery data
  useEffect(() => {
    dispatch(fetchJewelery());
  }, [dispatch]);

  useEffect(() => {
    if (categoryFilter) {
      const categoryFromURL = [categoryFilter]; // Convert single category to an array
      if (!selectedCategories.includes(categoryFilter)) {
        dispatch(setSelectedCategories(categoryFromURL));
      }
    }
  }, [categoryFilter, dispatch]);

  // to apply filters once jewelery data is available
  useEffect(() => {
    if (jewelery.length > 0 && !isInitialized) {
      const maxPrice = Math.max(
        ...jewelery.map(
          (jewel) => jewel.mrp - jewel.mrp * jewel.discount * 0.01
        )
      );
      dispatch(setPriceRange(maxPrice));
      setIsInitialized(true);
      console.log(priceRange);
    }

    // Set the filtered data based on available filters
    const filteredResults = filterFunction(
      priceRange,
      selectedCategories,
      selectedRating,
      nameSearch
    );
    dispatch(setFilteredData(filteredResults));
  }, [
    jewelery,
    priceRange,
    selectedCategories,
    selectedRating,
    categoryFilter,
    nameSearch,
  ]);

  //useEffect to apply sorting when filteredData is available
  useEffect(() => {
    if (filteredData.length > 0) {
      const sortedResult = [...filteredData].sort((a, b) => {
        const priceA = a.mrp - a.mrp * a.discount * 0.01;
        const priceB = b.mrp - b.mrp * b.discount * 0.01;
        if (sortBy === "high") {
          return priceB - priceA;
        } else if (sortBy === "low") {
          return priceA - priceB;
        } else {
          return 0;
        }
      });
      dispatch(setSortedData(sortedResult));
    } else {
      setSortedData(filteredData);
    }
  }, [sortBy, filteredData, dispatch]);

  const priceRangeHandler = (event) => {
    const { value } = event.target;
    dispatch(setPriceRange(value));
  };

  const categoryHandler = (event) => {
    const { value } = event.target;

    dispatch(toggleSelectedCatgories(value));

    // Get the updated list of selected categories from Redux
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value) // Remove if already selected
      : [...selectedCategories, value]; // Add if not selected

    // Update URL parameters
    const params = new URLSearchParams(window.location.search);

    if (updatedCategories.length > 0) {
      // Add the updated categories as a comma-separated list
      params.set("filter", updatedCategories.join(","));
    } else {
      // Remove the filter if no categories are selected
      params.delete("filter");
    }

    // Update the URL
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const ratingsHandler = (event) => {
    console.log(event.target.value);
    dispatch(setSelectedRating(event.target.value));
  };

  const clearFilterHandler = () => {
    console.log("clear");
    dispatch(
      setPriceRange(
        Math.max(
          ...jewelery.map(
            (jewel) => jewel.mrp - jewel.mrp * jewel.discount * 0.01
          )
        )
      )
    );
    const params = new URLSearchParams(window.location.search);

    params.delete("filter");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
    dispatch(setSelectedCategories([]));
    dispatch(setSelectedRating(null));
    dispatch(setSortBy(null));
    dispatch(setSortedData(jewelery));
  };

  const listSortHandler = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const categories = ["Rings", "Earrings", "Neckpieces", "Bracelets"];
  const ratings = [4, 3, 2, 1];

  const cartHandler = (e) => {
    const jewelleryId = e.target.id;
    const jewel = jewelery.reduce((acc, curr) => {
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

  return (
    <div>
      <Header />

      <div className="margin mt-5 pt-5">
        <button
          className=" text-start py-2 filter-btn d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasResponsive"
          aria-controls="offCanvasResponsive"
        >
          Filters
        </button>
        <div className=" row ">
          {/* filter section */}
          <div className="  filter-sec  col-md-3">
            <div
              className="offcanvas-md offcanvas-start "
              id="offcanvasResponsive"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                  aria-label="Close"
                ></button>
              </div>

              <div className="offcanvas-body">
                <div className="container-fluid">
                  <div className="d-flex justify-content-between ">
                    <p className="pt-3">
                      <strong>Filters: </strong>
                    </p>
                    <button
                      className="text-decoration-underline btn "
                      onClick={clearFilterHandler}
                    >
                      Clear
                    </button>
                  </div>
                  {/* price filter */}
                  <div className="py-3">
                    <p>
                      <strong>Price</strong>
                    </p>
                    <div
                      htmlFor="customRange2"
                      className="d-flex justify-content-between "
                    >
                      <span>0</span>
                      <span className="ps-4">1000</span>
                      <span>2000</span>
                    </div>
                    <input
                      type="range"
                      className="form-range "
                      min="0"
                      max={
                        jewelery.length > 0
                          ? Math.max(
                              ...jewelery.map(
                                (jewel) =>
                                  jewel.mrp - jewel.mrp * jewel.discount * 0.01
                              )
                            )
                          : 2000
                      }
                      step="10"
                      id="customRange2"
                      value={priceRange}
                      onChange={priceRangeHandler}
                    />
                    <br />
                  </div>
                  {/* Category filter */}
                  <div className="py-3">
                    <p>
                      <strong>Category</strong>
                    </p>
                    {categories.map((category) => (
                      <div key={category}>
                        <label>
                          <input
                            type="checkbox"
                            value={category}
                            name="category"
                            onChange={categoryHandler}
                            checked={selectedCategories.includes(category)}
                          />{" "}
                          {category}
                        </label>
                        <br />
                      </div>
                    ))}
                  </div>
                  {/* Rating filter */}
                  <div className="py-3">
                    <p>
                      <strong>Rating</strong>
                    </p>
                    {ratings.map((rating) => (
                      <div key={rating}>
                        <label>
                          <input
                            type="radio"
                            value={rating}
                            name="rating"
                            onClick={ratingsHandler}
                            checked={selectedRating == rating}
                          />
                          {rating} Stars & above
                        </label>
                        <br />
                      </div>
                    ))}
                  </div>
                  {/* {Sorting} */}
                  <div className="py-3">
                    <h3>Sort by</h3>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="high"
                        onClick={listSortHandler}
                        checked={sortBy === "high"}
                      />{" "}
                      price - high to low
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        value="low"
                        onClick={listSortHandler}
                        checked={sortBy === "low"}
                      />{" "}
                      price - low to high
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jewelery Section */}
          <div className="jewellery-sec col-md-9 px-4">
            <div className=" d-flex justify-content-center  pb-2  ">
              <div>
                <h2 className="tagline text-center">Crafted with Love.</h2>
              </div>
            </div>
            {status === "Loading" && <p className="text-center">Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row">
              {sortedData?.map((jewel) => (
                <div
                  className="col-6 col-md-3 my-2 view-details"
                  key={jewel._id}
                >
                  <div className="card border-0">
                    <Link
                      to={`/jewellery/${jewel._id}`}
                      className="text-decoration-none"
                    >
                      <img
                        className=" card-img-top rounded-0"
                        src={jewel.imageUrl}
                      />
                      <div className="middle">
                        <div className="text">View Details</div>
                      </div>
                    </Link>
                    <div className="card-body text-center">
                      <span className="card-text">{jewel.name}</span>
                      <br />
                      <span className="text-decoration-line-through text-secondary">
                        ${jewel.mrp}
                      </span>{" "}
                      <span className="fs-5">
                        <strong>
                          ${jewel.mrp - jewel.mrp * 0.01 * jewel.discount}
                        </strong>
                      </span>{" "}
                      <span className="fs-6 text-danger">
                        {jewel.discount}% OFF
                      </span>
                      <br />
                      <button
                        id={jewel._id}
                        onClick={cartHandler}
                        className=" w-100 fw-medium border-0 py-2  mt-3 mb-2 secondary-btn"
                      >
                        Add to Cart
                      </button>
                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jewellery;
