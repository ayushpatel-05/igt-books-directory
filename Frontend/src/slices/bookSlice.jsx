import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;




export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (_, { rejectWithValue, getState }) => {
    try {
      let params = {};
      const checked = getState().book.checked;
      const priceRange = getState().book.priceRange;
      params = {params, ...checked};
      params.priceMin = priceRange.min;
      params.priceMax = priceRange.max;
      params.limit = 100;
      const response = await axios.get('http://localhost:3000/api/v1/books', {
        params: params
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchCategories = createAsyncThunk(
  'book/fetchCategories',
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/books/list/${categoryName}`);
      return {categoryName, data: response.data};
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    categories: {genre: [], author: [], publisher: []},
    checked: {genre: null, author: null, publisher: null},
    priceRange: {min: null, max: null},
    loading: false,
    error: null
  },
  reducers: {
    setCheckBox: (state, action) => {
      if(state.checked[action.payload.category] != action.payload.value)
        state.checked[action.payload.category] = action.payload.value;
      else
      state.checked[action.payload.category] = null;
    },
    setMinMaxPrice: (state, action) => {
      state.priceRange = {...state.priceRange, [action.payload.name]: action.payload.value};
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    })
    .addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories[action.payload.categoryName] = action.payload.data;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setCheckBox, setMinMaxPrice } = bookSlice.actions;

export default bookSlice.reducer;
