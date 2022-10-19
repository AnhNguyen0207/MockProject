import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";
interface ITitle {
  title: string;
}

const initialTitle: string = "";

export const titleSilce = createSlice({
  name: "title",
  initialState: initialTitle,
  reducers: {
    setTitle: (state, action: PayloadAction<ITitle>) => {
      return action?.payload?.title || initialTitle;
    },
  },
});

export const { setTitle } = titleSilce.actions;

export default titleSilce.reducer;
