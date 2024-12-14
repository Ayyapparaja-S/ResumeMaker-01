import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
    Auth: ''
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload
        },
        setAuth(state, action){
            state.Auth = action.payload
        }
    }
})

export const { setUser, setAuth } = userSlice.actions


export default userSlice.reducer;