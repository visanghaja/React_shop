import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeName(state){ // state 에는 원래 값이 들어감
            state.name = 'park'
        },
        changeAge(state, action){
            state.age += action.payload // 함수에 parameter 넣을때는 뒤에 payload 붙여주기!
        }
    }
})
export let {changeName, changeAge} = user.actions

export default user