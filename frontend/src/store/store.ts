import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import astronautsReducer from "./slices/astronautsSlice.ts"

export const store = configureStore({
    reducer: {
        astronauts: astronautsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;