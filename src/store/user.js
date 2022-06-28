import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    displayName: '',
    email: '',
    photoURL: '',
    creationTime: '',
    homemates: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserInfo(state, action){
            console.log(action.payload)
            state.displayName = action.payload[0];
            state.email = action.payload[1];
            state.photoURL = action.payload[2];
            state.creationTime = action.payload[3]
        },
        setHomematesInfo(state, action){
            state.homemates.push(action.payload);
        },
        resetHomemates(state){
            state.homemates = [];
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;