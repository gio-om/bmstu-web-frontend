import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import flightsReducer from "./slices/flightsSlice.ts"
import astronautsReducer from "./slices/astronautsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        flights: flightsReducer,
        astronauts: astronautsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;