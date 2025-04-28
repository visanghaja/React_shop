import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge, changeName } from './../store/userSlice.js'
import { increase, deleteItem } from './../store.js'
import { memo, useState } from 'react'

let Child = memo( function(){
    return <div>자식임</div>
})


function Cart(){
    let state = useSelector((state)=> state ) // store 안에 있던 state 남음
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    return(
        <div>
            <Child></Child>
            <button onClick={() => { setCount(count+1) }}></button>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{dispatch(changeAge(1))}}>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    console.log(state.shopping)
                }
                {
                    
                    state.shopping.map((data, i) => {
                        
                        return(
                                <tr key={i}> 
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(increase(data.id))
                                    }}>+</button></td>
                                    <td><button onClick={()=>{
                                        dispatch(deleteItem(data.id))
                                    }}>DEL</button></td>
                                </tr>
                        )
                    })
                }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart