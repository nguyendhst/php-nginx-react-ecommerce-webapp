import { configureStore } from "@reduxjs/toolkit";
import admin from "./admin";

export const store = configureStore({
  reducer: {
    admin : admin
  },
});
