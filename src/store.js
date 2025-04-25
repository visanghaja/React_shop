import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let shopping = createSlice({
    name : 'shopping',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ], 
    reducers : {
        increase(state, action){
            let result = state.find((item) => item.id === action.payload)
            result.count += 1
        },
        append(state, action){
          if (!state.some(item => item.name === action.payload.name)) {
            state.push(action.payload)
          }
            // console.log(JSON.parse(JSON.stringify(state)))
        },
        deleteItem(state, action){
            let result = state.findIndex((item) => item.id === action.payload)
            state.splice(result, 1)
        }
    }
})

export let {increase, append, deleteItem} = shopping.actions

export default configureStore({
  reducer: { 
    user : user.reducer, // 뒤에 reducer 꼭 붙여야함
    stock : stock.reducer,
    shopping : shopping.reducer
  }
}) 