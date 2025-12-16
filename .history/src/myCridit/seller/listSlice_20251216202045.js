import { createSlice } from "@reduxjs/toolkit";
import clientsData from './data';



const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: clientsData,

    },
    reducers: {
        remove: (state, action)=>{
            state.list = state.list.filter(t=>t.cin !== action.payload)
        },
        
        ajouter: (state,action) => {
            
            state.list=[
                ...state.list,action.payload
            ]
        },
        rechercher:(state,action)=>{
        state.list =state.list.filter(t=> (t.name.toLowerCase().includes(action.payload.name.toLowerCase()) ))
        }
    }
})

export const { remove ,ajouter,rechercher} = listSlice.actions
export default listSlice.reducer