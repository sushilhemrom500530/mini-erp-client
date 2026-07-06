import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/index.js'
import { userSlice } from './userSlice.js'

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware)
    }

})



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch