import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  addAddress,
  deleteAddressAsync,
  editAddress,
  fetchAdresses,
  selectedAddressAsync,
} from "./addressSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import AddressForm from "./AddressForm";

const Addresses = () => {
  const [form, setForm] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdresses());
  }, [dispatch]);

  const { addresses, selectedAddress, formType } = useSelector(
    (state) => state.addresses
  );

  const selectAddressHanlder = (e) => {
    const { value } = e.target;
    dispatch(selectedAddressAsync(value));
  };

  const addAdressHandler = () => {
    dispatch(addAddress());
    setForm(true);
  };

  const editAddressHandler = (address) => {
    dispatch(editAddress(address));
    setForm(true);
  };

  const deleteAddressHandler = (addressId) => {
    dispatch(deleteAddressAsync(addressId));
  };

  return (
    <div
      className="modal fade "
      id="addressModal"
      tabindex="-1"
      aria-labelledby="addressModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header border-5">
            {form ? (
              <div className="d-flex align-items-center">
                <button className="btn" onClick={() => setForm(false)}>
                  <IoArrowBackSharp className="fs-4" />
                </button>
                <h1
                  className="modal-title fs-6 text-secondary"
                  id="addressModalLabel"
                >
                  {formType === "update" ? "Edit Address" : "ADD NEW ADDRESS"}
                </h1>
              </div>
            ) : (
              <h1 className="modal-title fs-6">Select Delivery Address</h1>
            )}

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {form ? (
              <AddressForm />
            ) : (
              <div>
                <div className="d-flex justify-content-between bg-body-secondary align-items-center p-4">
                  <div className="text-secondary fw-bold ">SAVED ADDRESS</div>

                  <div>
                    <button
                      className=" add-address-btn fw-medium bg-body-secondary"
                      onClick={addAdressHandler}
                    >
                      + Add New Address
                    </button>
                  </div>
                </div>
                {addresses?.map((address) => (
                  <div
                    className="py-3 border-bottom border-4"
                    key={address._id}
                  >
                    <label className="d-flex align-items-start ">
                      <input
                        type="radio"
                        name="address"
                        className="mt-2"
                        value={address._id}
                        onClick={selectAddressHanlder}
                        checked={selectedAddress?._id === address._id}
                      />
                      <div className="ms-2 ">
                        <small>
                          <strong>{address.name}</strong>
                        </small>
                        <br />
                        {selectedAddress &&
                        selectedAddress._id === address._id ? (
                          <div>
                            <small>{address.address.houseNo}</small>
                            <br />
                            <small>{address.address.locality}</small>
                            <br />
                            <small>
                              {address.address.city}, {address.address.state},{" "}
                              {address.address.country} -{" "}
                              {address.address.pinCode}
                            </small>
                            <br />

                            <small>
                              Mobile: <strong>{address.phoneNumber}</strong>
                            </small>
                            <div className="d-flex justify-content-between  my-2">
                              <div className="me-5">
                                <button
                                  data-bs-dismiss="modal"
                                  className="select-address border-0 rounded text-light fw-medium py-1 px-2 me-2"
                                >
                                  DELIVER HERE
                                </button>
                                <button
                                  onClick={() => editAddressHandler(address)}
                                  className="rounded py-1 px-3 bg-light me-5 border  border-dark fw-medium"
                                >
                                  Edit
                                </button>
                              </div>
                              <button
                                className="rounded py-1 px-2 border ms-5 border-dark"
                                onClick={() =>
                                  deleteAddressHandler(address._id)
                                }
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <small>
                              {address.address.houseNo},{" "}
                              {address.address.locality}
                            </small>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
