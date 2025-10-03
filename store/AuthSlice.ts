import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    userLoggedIn:boolean
    user:any|null

}

const initialState:AuthState = {
    userLoggedIn: false,
    user:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state, action:PayloadAction<any | null>){
            state.user = action.payload
            state.userLoggedIn = !!action.payload

        },
        clearUser:(state) => {
            state.user = null
            state.userLoggedIn = false

        }
    }
})

export const {setUser, clearUser} = authSlice.actions
export default authSlice.reducer