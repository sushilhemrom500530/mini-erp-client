import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    cridentials: {}
}

const initialState: UserState = {
    cridentials: {}
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUserCredentials: (state, payload) => {
            state.cridentials = { ...state.cridentials, ...payload.payload }
        },
    },
})


export const { addUserCredentials } = userSlice.actions

export default userSlice.reducer