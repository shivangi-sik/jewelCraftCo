import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartSlice from "../cart/cartSlice";
import axios from "axios";

export const fetchAdresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await axios.get(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/address"
    );
    return response.data;
  }
);

export const selectedAddressAsync = createAsyncThunk(
  "addresses/selectedAddressAsync",
  async (addressId) => {
    const response = await axios.get(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/address/${addressId}`
    );
    return response.data;
  }
);

export const addAddressAsync = createAsyncThunk(
  "addresses/addAddressAsync",
  async (newAddress) => {
    const response = await axios.post(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/address",
      newAddress
    );
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "addresses/deleteAddressAsync",
  async (addressId) => {
    await axios.delete(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/address/${addressId}`
    );
    return addressId;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "addresses/updateAddressAsync",
  async (updatedData) => {
    const response = await axios.put(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/address/${updatedData._id}`,
      updatedData
    );

    return response.data;
  }
);

export const addressSlice = createSlice({
  name: "adddress",
  initialState: {
    addresses: [],
    selectedAddress: null,
    formType: "add",
    status: "idle",
    error: "null",
  },
  reducers: {
    editAddress: (state, action) => {
      state.selectedAddress = action.payload;
      state.formType = "update";
    },
    addAddress: (state) => {
      state.formType = "add";
    },
  },
  extraReducers: (builder) => {
    //fetch addresses
    builder.addCase(fetchAdresses.pending, (state) => {
      state.status = "Loading";
    });

    builder.addCase(fetchAdresses.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.addresses = action.payload;
    });

    builder.addCase(fetchAdresses.rejected, (state, action) => {
      (state.status = "failed"), (state.error = action.error.message);
    });

    //add address
    builder.addCase(addAddressAsync.fulfilled, (state, action) => {
      state.addresses.push(action.payload);
    });

    //fetch Selected Address
    builder.addCase(selectedAddressAsync.fulfilled, (state, action) => {
      state.selectedAddress = action.payload;
    });

    //update Address
    builder.addCase(updateAddressAsync.fulfilled, (state, action) => {
      const findIndex = state.addresses.findIndex(
        (address) => address._id === action.payload._id
      );
      if (findIndex >= 0) {
        state.addresses[findIndex] = action.payload;
      }
    });

    //delete Address
    builder.addCase(deleteAddressAsync.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address._id != action.payload
      );
      state.selectedAddress = null;
    });
  },
});

export const { editAddress, addAddress } = addressSlice.actions;

export default addressSlice.reducer;
