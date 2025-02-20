import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false
}


const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action){
            state.loading = action.payload
        }
    }
})

export const { setLoading } = AppSlice.actions


export default AppSlice.reducer;