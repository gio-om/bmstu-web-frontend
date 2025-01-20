import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Astronaut, T_AstronautsListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveFlight} from "store/slices/flightsSlice.ts";

type T_AstronautsSlice = {
    astronaut_name: string  // Параметр фильтрации
    astronaut: null | T_Astronaut  // Отрытый астронват
    astronauts: T_Astronaut[]  // Список их
}

const initialState:T_AstronautsSlice = {
    astronaut_name: "",
    astronaut: null,
    astronauts: []
}

export const fetchAstronaut = createAsyncThunk<T_Astronaut, string, AsyncThunkConfig>(
    "fetch_astronaut",
    async function(id) {
        const response = await api.astronauts.astronautsRead(id) as AxiosResponse<T_Astronaut>
        return response.data
    }
)

export const fetchAstronauts = createAsyncThunk<T_Astronaut[], object, AsyncThunkConfig>(
    "fetch_astronauts",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.astronauts.astronautsList({
            astronaut_name: state.astronauts.astronaut_name
        }) as AxiosResponse<T_AstronautsListResponse>

        thunkAPI.dispatch(saveFlight({
            draft_flight_id: response.data.draft_flight_id,
            astronauts_count: response.data.astronauts_count
        }))

        return response.data.astronauts
    }
)

export const addAstronautToFlight = createAsyncThunk<void, string, AsyncThunkConfig>(
    "astronauts/add_astronaut_to_flight",
    async function(astronaut_id) {
        await api.astronauts.astronautsAddToFlightCreate(astronaut_id)
    }
)

const astronautsSlice = createSlice({
    name: 'astronauts',
    initialState: initialState,
    reducers: {
        updateAstronautName: (state, action) => {
            state.astronaut_name = action.payload
        },
        removeSelectedAstronaut: (state) => {
            state.astronaut = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAstronauts.fulfilled, (state:T_AstronautsSlice, action: PayloadAction<T_Astronaut[]>) => {
            state.astronauts = action.payload
        });
        builder.addCase(fetchAstronaut.fulfilled, (state:T_AstronautsSlice, action: PayloadAction<T_Astronaut>) => {
            state.astronaut = action.payload
        });
    }
})

export const { updateAstronautName, removeSelectedAstronaut} = astronautsSlice.actions;

export default astronautsSlice.reducer