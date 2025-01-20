import {createSlice} from "@reduxjs/toolkit";

type T_AstronautsSlice = {
    astronaut_name: string
}

const initialState:T_AstronautsSlice = {
    astronaut_name: "",
}


const astronautsSlice = createSlice({
    name: 'astronauts',
    initialState: initialState,
    reducers: {
        updateAstronautName: (state, action) => {
            state.astronaut_name = action.payload
        }
    }
})

export const { updateAstronautName} = astronautsSlice.actions;

export default astronautsSlice.reducer