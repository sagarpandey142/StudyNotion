import {createSlice} from "@reduxjs/toolkit"

const initialState={
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
        loading:false,
        signupData:null,
    }

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        setSignupData(state,value){
            console.log("payload",value.payload)
            state.signupData=value.payload;
            console.log("signupData",state.signupData)
        },
    },
})

export const {setToken,setSignupData,setLoading}=authSlice.actions;
export default authSlice.reducer;