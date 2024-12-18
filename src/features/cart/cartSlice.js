import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(
    "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/cart"
  );

  return response.data;
});

export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async (newCartItem) => {
    const response = await axios.post(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/cart",
      newCartItem
    );

    return response.data;
  }
);
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (productId) => {
    await axios.delete(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/cart/${productId}`
    );

    return productId;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemAsync",
  async (updatedData) => {
    const response = await axios.put(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/cart/${updatedData._id}`,
      updatedData
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk();
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch Cart items
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "Loading...";
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.cartItems = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //add Items
    builder.addCase(addCartItemAsync.pending, (state) => {
      state.status = "pending";
      toast.info("Adding item to the cart!", {
        autoClose: 1000,
      });
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
      state.status = "succeeded";
      toast.success("Item added to the cart successfully!");
    });
    builder.addCase(addCartItemAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
      toast.error(state.error);
    });

    //remove items
    builder.addCase(removeCartItemAsync.pending, (state) => {
      state.status = "pending";
      toast.info("Removing item from the cart!", {
        autoClose: 1000,
      });
    });

    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.status = "succeeded";
      toast.warn("Item removed from the cart!");
    });

    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
      toast.error(state.error);
    });

    //updateItem
    builder.addCase(updateCartItemAsync.pending, (state) => {
      state.status = "pending";
      toast.info("Updating cart item!", {
        autoClose: 1000,
      });
    });
    builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id == action.payload._id
      );
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      }
      state.status = "succeeded";
      toast.success("Cart Item updated successfully!");
      toast.info(
        `${state.cartItems[index].quantity} ${state.cartItems[index].name} in the cart.`
      );
    });

    builder.addCase(updateCartItemAsync.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
      toast.error(state.error);
    });
  },
});

export default cartSlice.reducer;
