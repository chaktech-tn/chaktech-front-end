import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  isShow:false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.isShow = true;
    },
    handleModalShow: (state) => {
      state.isShow = false;
    },
  },
});

export const {setProduct,handleModalShow} = productSlice.actions;
export default productSlice.reducer;
