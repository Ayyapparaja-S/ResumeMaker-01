/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { type documentProps } from "../../Types/types";

export interface InfoSliceProps {
    document: documentProps | object,
    documents: documentProps[] | []
}

const initialState: InfoSliceProps = {
    document: {},
    documents: []
}


const infoSlice = createSlice({
    name: 'information',
    initialState,
    reducers: {
        setDocument(state, action){
            state.document = action.payload
        },
        setDocuments(state, action){
            state.documents = action.payload
        }
    }
})

export const { setDocument,  setDocuments} = infoSlice.actions


export default infoSlice.reducer;