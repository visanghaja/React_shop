import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge, changeName } from './../store/userSlice.js'
import { increase } from './../store.js'

function Cart(){
    let state = useSelector((state)=> state ) // store 안에 있던 state 남음
    let dispatch = useDispatch()

    return(
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{dispatch(changeAge(1))}}>버튼</button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
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