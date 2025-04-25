import { createContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css'
// import bg from './bg.png'
import data from './routes/data.js'
import Item from './routes/item.jsx'
import Detail from './routes/detail.jsx'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import Cart from './routes/Cart.jsx'

let Context1 = createContext() // context 라는 state 보관함을 만들어줌

function App() {

  let [shoes, setShoes] = useState(data) // 대충 서버에서 받아온 데이터
  let navigate = useNavigate(); // 함수반환
  let [click, setClick] = useState(0);
  let [noitem, setNoitem] = useState(false);
  let [loading, setLoading] = useState(false);
  // let[재고] = useState([10, 11, 12])


  return (
    <div className='App'>

      <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
        <Container fluid>
          <Navbar.Brand href="#home">Shooop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      {/* <Link to="/">홈</Link>
      <Link>홈</Link> */}
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((data, i) => {
                    return(
                      <Item shoes = {data} i = {i+1} key = {i} />
                    )
                  })
                }
              </div>
            </div>
            {noitem && (
              <div className="alert alert-warning">아이템 더 없음</div>
            )}
            <button onClick={() => {
              setLoading(true)
              if (click === 0) {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=> { // 여기 데이터 안에 get 요청해서 받은 데이터 들어감!
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                  setClick(click+1)
                  setLoading(false)
                })
                .catch(()=>{
                  console.log('실패함 ㅅㄱ')
                })
              } else if (click === 1) {
                axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((result)=> { // 여기 데이터 안에 get 요청해서 받은 데이터 들어감!
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                  setClick(click+1)
                  setLoading(false)
                })
                .catch(()=>{
                  console.log('실패함 ㅅㄱ')
                })
              } else {
                setNoitem(true)
                setLoading(false)
              }

            }}>버튼</button>
          </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes = {shoes} />}/>


        <Route path='*' element={<div>없는 페이지입니다</div>}/>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>}/> 
          <Route path='location' element={<div>장소임</div>}/>
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}/> 
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}/> 
        </Route>

        <Route path='/cart' element={<Cart/>} />
      </Routes>


    </div>
  )
}
function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet />
    </div>
  )
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  )
}

export default App

