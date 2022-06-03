import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    displayName: '',
    email: '',
    photoURL: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserInfo(state, action){
            state.displayName = action.payload[0];
            state.email = action.payload[1];
            state.photoURL = action.payload[2];
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;