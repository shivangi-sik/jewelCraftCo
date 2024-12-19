import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import useFetch from "./useFetch";

export default function App() {
  return (
    <>
      <Header />

      <main className="margin">
        <div className="mb-3 mt-5 ">
          <div>
            <h2 className="tagline text-center">
              Where every piece is a work of heart.
            </h2>
            <div
              id="carouselExample"
              className="carousel slide  pt-1"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://kisna.com/cdn/shop/files/Homepage_banner_2_be0deaab-654b-4b99-91f4-be2ad9d74c78_1524x.jpg?v=1724848754"
                    className="d-block w-100"
                    alt="carousel image 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://kisna.com/cdn/shop/files/Homepage_banner_1_e6408757-586b-442a-8131-71b1de311ae1_1524x.jpg?v=1724848811"
                    className="d-block w-100"
                    alt="carousel image 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://kisna.com/cdn/shop/files/Homepage_banner_7_copy_1524x.jpg?v=1724321177"
                    className="d-block w-100"
                    alt="carousel image 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className=" d-flex justify-content-center py-2 pb-4 ">
              <button className="border-0 primary-btn">
                <Link to="/jewellery" className="  btn text-light">
                  Shop Now
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          {" "}
          <div className="row ">
            <div className="col-6 col-md-3">
              <Link to="/jewellery?filter=Earrings">
                <div className="card border-0">
                  <img src="https://everstylish.com/pub/media/gallery/e/a/earrings_gif_3.gif" />
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 ">
              <Link to="/jewellery?filter=Rings">
                <div className="card border-0">
                  <img src="https://everstylish.com/pub/media/gallery/r/i/rings_gif_5.gif" />
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 ">
              <Link to="/jewellery?filter=Neckpieces">
                <div className="card border-0">
                  <img src="https://everstylish.com/pub/media/gallery/n/e/neckpieces_gif_3.gif" />
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-3 ">
              <Link to="/jewellery?filter=Bracelets">
                <div className="card border-0">
                  <img src="https://everstylish.com/pub/media/gallery/b/r/bracelets_gif_3.gif" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
