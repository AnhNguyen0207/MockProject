import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import titleReducer from "../features/titleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    title: titleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
