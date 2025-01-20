export type T_Astronaut =  {
    id: number,
    name: string,
    description: string,
    space_time: number,
    specialization: string,
    country: string,
    image: string,
    status: number
}

export type T_Flight = {
    id: string | null
    status: E_FlightStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    astronauts: T_Astronaut[]
    name: string
    date: string
    is_successful: number
}

export enum E_FlightStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_FlightsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_FlightStatus
}

export type T_AstronautsListResponse = {
    astronauts: T_Astronaut[],
    draft_flight_id: number,
    astronauts_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}