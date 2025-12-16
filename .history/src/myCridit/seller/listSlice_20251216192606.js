import { createSlice } from "@reduxjs/toolkit";
import clientsData from './data';



const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: clientsData,

    },
    reducers: {
        remove: (state, action)=>{
            state.list = state.list.filter(t=>t.code !== action.payload)
        },
        modifier: (state, action) => {
            state.list = state.list.map(t => (t.code === Number(action.payload.code)) ? { ...t, titre: action.payload.titre, description: action.payload.desc }:t)
        },
        ajouter: (state,action) => {
            
            state.list=[
                ...state.list,action.payload
            ]
        },
        rechercher:(state,action)=>{
        state.list =state.list.filter(t=> (t.titre.toLowerCase().includes(action.payload.titre.toLowerCase()) ))
        }
    }
})

export const { remove, modifier ,ajouter,rechercher} = listSlice.actions
export default listSlice.reducer