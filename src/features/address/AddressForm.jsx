import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddressAsync, updateAddressAsync } from "./addressSlice";

const AddressForm = () => {
  const { selectedAddress, formType } = useSelector((state) => state.addresses);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: {
      houseNo: "",
      locality: "",
      city: "",
      pinCode: "",
      state: "",
      country: "",
    },
  });
  useEffect(() => {
    if (formType === "add") {
      setFormData({
        name: "",
        phoneNumber: "",
        address: {
          houseNo: "",
          locality: "",
          city: "",
          pinCode: "",
          state: "",
          country: "",
        },
      });
    } else if (formType === "update" && selectedAddress) {
      setFormData(selectedAddress);
    }
  }, []);

  const dispatch = useDispatch();

  const contactHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addressHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (formType === "add") {
      dispatch(addAddressAsync(formData));
    } else {
      dispatch(updateAddressAsync(formData));
    }

    setFormData({
      name: "",
      phoneNumber: "",
      address: {
        houseNo: "",
        locality: "",
        city: "",
        pinCode: "",
        state: "",
        country: "",
      },
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="mb-3 ">
        <label className="form-label mb-3">Contact Details</label>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              name="name"
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Name*"
              onChange={contactHandler}
              required
              value={formData.name}
            />
            <label for="inputName">Name*</label>
          </div>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">+91</span>

          <div class="form-floating">
            <input
              name="phoneNumber"
              type="text"
              class="form-control"
              id="inputPhoneNumber"
              placeholder="Phone No*"
              onChange={contactHandler}
              required
              value={formData.phoneNumber}
            />
            <label for="inputPhoneNumber">Phone No*</label>
          </div>
        </div>
      </div>
      <div className="">
        <label className="form-label mb-3 ">Address</label>
        <div class="input-group mb-2">
          <div class="form-floating">
            <input
              type="text"
              class="form-control text-secondary"
              id="AddressInput"
              placeholder="Address(House No, Building, Street, Area)*"
              name="houseNo"
              onChange={addressHandler}
              required
              value={formData.address.houseNo}
            />
            <label for="AddressInput">
              Address(House No, Building, Street, Area)*
            </label>
          </div>
        </div>

        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="inputLocality"
              placeholder="Locality/Town*"
              name="locality"
              onChange={addressHandler}
              required
              value={formData.address.locality}
            />
            <label for="inputLocality">Locality/Town*</label>
          </div>
        </div>
        <div className="d-flex ">
          <div class="input-group mb-3 me-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="cityInput"
                placeholder="City/District*"
                name="city"
                onChange={addressHandler}
                required
                value={formData.address.city}
              />
              <label for="cityInput">City/District*</label>
            </div>
          </div>
          <div class="input-group mb-3 me-2">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="inputPinCode"
                placeholder="Pincode*"
                name="pinCode"
                onChange={addressHandler}
                value={formData.address.pinCode}
              />
              <label for="inputPinCode">Pincode*</label>
            </div>
          </div>
          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="stateInput"
                placeholder="State*"
                name="state"
                onChange={addressHandler}
                required
                value={formData.address.state}
              />
              <label for="stateInput">State*</label>
            </div>
          </div>
        </div>

        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="inputCountry"
              placeholder="Country*"
              name="country"
              onChange={addressHandler}
              required
              value={formData.address.country}
            />
            <label for="inputCountry">Country*</label>
          </div>
        </div>
      </div>

      <div className=" border-top border-2  pt-2 pb-2 ">
        <button
          className="submit-address-btn text-light fw-medium p-3"
          type="submit"
        >
          {formType === "add" ? " ADD ADDRESS" : "SAVE ADDRESS"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
