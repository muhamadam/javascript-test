import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosBaseUrl } from '../config/axios-configuration';

const axios = axiosBaseUrl();

const initialState = {
  cards: [],
  total: 0,
  message: '',
  loading: false,
  err: null,
  success: false
};

export const GetCards = createAsyncThunk('/cards/get-cards', async (data, thunkAPI) => {
  try {
    const {
      searchKeyword = '',
      limit = 20
    } = data || {};

    const response = await axios.get('/cards/get-cards', {
      params: {
        searchKeyword,
        limit
      }
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return thunkAPI.rejectWithValue({
        err: err.response.data,
        status: err.response.status
      });
    }
    return thunkAPI.rejectWithValue({
      err: {
        error: 'Network Error'
      }
    });
  }
});

const cards = createSlice({
  name: 'CardsReducer',
  initialState,
  reducers: {
    SetCardsState(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: {
    [GetCards.pending]: (state) => ({
      ...state,
      err: null,
      // loading: true,
      success: false
    }),
    [GetCards.fulfilled]: (state, action) => ({
      ...state,
      err: null,
      total: action.payload.total,
      cards: action.payload.cards,
      loading: false,
      message: action.payload.message
    }),
    [GetCards.rejected]: (state, action) => ({
      ...state,
      loading: false,
      err: action.payload.err?.error,
      success: false
    })
  }
});

export const { SetCardsState } = cards.actions;
export default cards.reducer;
