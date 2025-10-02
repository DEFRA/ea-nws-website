import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    readyToNavigate: false
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setReadyToNavigate: (state, action) => {
            state.readyToNavigate = action.payload
        },
        resetNavigation: (state) => {
            state.readyToNavigate = false
        }
    }
})

export const {setReadyToNavigate, resetNavigation} = navigationSlice.actions
export default navigationSlice.reducer