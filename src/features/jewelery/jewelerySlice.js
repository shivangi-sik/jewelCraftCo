import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJewelery = createAsyncThunk(
  "jewelery/fethJewelery",
  async () => {
    const response = await axios.get(
      "https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/jewelery"
    );

    return response.data;
  }
);

export const fetchJeweleryDetailAsync = createAsyncThunk(
  "jewelery/fetchJeweleryDetailAsync",
  async (id) => {
    const response = await axios.get(
      `https://ecommere-backend-git-main-shivangi-siks-projects.vercel.app/jewellery/${id}`
    );

    return response.data;
  }
);

export const jewelerySlice = createSlice({
  name: "jewelery",
  initialState: {
    jewelery: [],
    status: "idle",
    error: null,
    filteredData: [],
    sortedData: [],
    filters: {
      priceRange: null,
      selectedCategories: [],
      selectedRating: null,
      nameSearch: null,
    },
    sortBy: null,
    jewelDetail: {},
  },
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.filters.selectedCategories = action.payload;
    },
    toggleSelectedCatgories: (state, action) => {
      state.filters.selectedCategories =
        state.filters.selectedCategories.includes(action.payload)
          ? state.filters.selectedCategories.filter(
              (category) => category !== action.payload
            )
          : [...state.filters.selectedCategories, action.payload];
    },
    setSelectedRating: (state, action) => {
      state.filters.selectedRating = action.payload;
    },
    setNameSearch: (state, action) => {
      state.filters.nameSearch = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortedData: (state, action) => {
      state.sortedData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch jewelery data
    builder.addCase(fetchJewelery.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchJewelery.fulfilled, (state, action) => {
      (state.status = "succeeded"), (state.jewelery = action.payload);
    });
    builder.addCase(fetchJewelery.rejected, (state, action) => {
      (state.status = "Failed"), (state.error = action.error.message);
    });

    //fetch jewelery detail
    builder.addCase(fetchJeweleryDetailAsync.fulfilled, (state, action) => {
      state.jewelDetail = action.payload;
    });
  },
});

export const {
  setPriceRange,
  setSelectedCategories,
  toggleSelectedCatgories,
  setSelectedRating,
  setNameSearch,
  setFilteredData,
  setSortBy,
  setSortedData,
} = jewelerySlice.actions;

export default jewelerySlice.reducer;
