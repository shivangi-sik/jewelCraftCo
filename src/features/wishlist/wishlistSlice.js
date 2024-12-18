import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/wishlist"
    );
    return response.data;
  }
);

export const addWishItemAsync = createAsyncThunk(
  "wishlist/addWishItemAsync",
  async (newWishItem) => {
    const response = await axios.post(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/wishlist",
      newWishItem
    );
    return response.data;
  }
);
export const removeWishItemAsync = createAsyncThunk(
  "wishlist/removeWishItemAsync",
  async (productId) => {
    await axios.delete(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/wishlist/${productId}`
    );

    return productId;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    error: null,
    status: "idle",
  },
  reducers: {},

  extraReducers: (builder) => {
    //fetch wishlist items
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "Loading...";
    });

    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //add Items
    builder.addCase(addWishItemAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addWishItemAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.wishlist.push(action.payload);
      toast.success("Item added to the wishlist successfully!");
    });
    builder.addCase(addWishItemAsync.rejected, (state, action) => {
      state.status = "failed";
      toast.error(action.error.message);
    });

    //remove items
    builder.addCase(removeWishItemAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removeWishItemAsync.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
      toast.warn("Item removed from wishlist!");
    });
    builder.addCase(removeWishItemAsync.rejected, (state, action) => {
      state.status = "failed";
      toast.error(action.error.message);
    });
  },
});

export default wishlistSlice.reducer;
