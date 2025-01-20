import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Flight, T_FlightsFilters, T_Astronaut} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_FlightsSlice = {
    draft_flight_id: number | null,  // id черновика полета
    astronauts_count: number | null,
    flight: T_Flight | null,  // Полет
    flights: T_Flight[],  // Список полетов
    filters: T_FlightsFilters,  // Фильтры
    save_mm: boolean  // для обновления полей m-m
}

const initialState:T_FlightsSlice = {
    draft_flight_id: null,
    astronauts_count: null,
    flight: null,
    flights: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false  // Флаг сохранения м-м
}

export const fetchFlight = createAsyncThunk<T_Flight, string, AsyncThunkConfig>(
    "flights/flight",
    async function(flight_id) {
        const response = await api.flights.flightsRead(flight_id) as AxiosResponse<T_Flight>
        return response.data
    }
)

export const fetchFlights = createAsyncThunk<T_Flight[], object, AsyncThunkConfig>(
    "flights/flights",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.flights.flightsList({
            status: state.flights.filters.status,
            date_formation_start: state.flights.filters.date_formation_start,
            date_formation_end: state.flights.filters.date_formation_end
        }) as unknown as AxiosResponse<T_Flight[]>
        return response.data
    }
)

export const removeAstronautFromDraftFlight = createAsyncThunk<T_Astronaut[], string, AsyncThunkConfig>(
    "flights/remove_astronaut",
    async function(astronaut_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.flights.flightsDeleteAstronautDelete(state.flights.flight.id, astronaut_id) as unknown as AxiosResponse<T_Astronaut[]>
        return response.data
    }
)

export const deleteDraftFlight = createAsyncThunk<void, object, AsyncThunkConfig>(
    "flights/delete_draft_flight",
    async function(_, {getState}) {
        const state = getState()
        await api.flights.flightsDeleteDelete(state.flights.flight.id)
    }
)

export const sendDraftFlight = createAsyncThunk<void, object, AsyncThunkConfig>(
    "flights/send_draft_flight",
    async function(_, {getState}) {
        const state = getState()
        await api.flights.flightsUpdateStatusUserUpdate(state.flights.flight.id)
    }
)

export const updateFlight = createAsyncThunk<void, object, AsyncThunkConfig>(
    "flights/update_flight",
    async function(data, {getState}) {
        const state = getState()
        await api.flights.flightsUpdateUpdate(state.flights.flight.id, {
            ...data
        })
    }
)

export const updateAstronautValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "flights/update_mm_value",
    async function({astronaut_id, leader},thunkAPI) {
        const state = thunkAPI.getState()
        await api.flights.flightsUpdateAstronautUpdate(state.flights.flight.id, astronaut_id, {leader})
    }
)

const flightsSlice = createSlice({
    name: 'flights',
    initialState: initialState,
    reducers: {
        saveFlight: (state, action) => {
            state.draft_flight_id = action.payload.draft_flight_id
            state.astronauts_count = action.payload.astronauts_count
        },
        removeFlight: (state) => {
            state.flight = null
        },
        triggerUpdateMM: (state) => {  // Вызывается из страницы, обновляем стейт
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFlight.fulfilled, (state:T_FlightsSlice, action: PayloadAction<T_Flight>) => {
            state.flight = action.payload
        });
        builder.addCase(fetchFlights.fulfilled, (state:T_FlightsSlice, action: PayloadAction<T_Flight[]>) => {
            state.flights = action.payload
        });
        builder.addCase(removeAstronautFromDraftFlight.rejected, (state:T_FlightsSlice) => {
            state.flight = null
        });
        builder.addCase(removeAstronautFromDraftFlight.fulfilled, (state:T_FlightsSlice, action: PayloadAction<T_Astronaut[]>) => {
            if (state.flight) {
                state.flight.astronauts = action.payload as T_Astronaut[]
            }
        });
        builder.addCase(sendDraftFlight.fulfilled, (state:T_FlightsSlice) => {
            state.flight = null
        });
    }
})

export const { saveFlight, removeFlight, triggerUpdateMM, updateFilters } = flightsSlice.actions;

export default flightsSlice.reducer