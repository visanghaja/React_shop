import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import './App.css'
// import bg from './bg.png'
import data from './routes/data.js'
import Item from './routes/item.jsx'
import Detail from './routes/detail.jsx'
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'


function App() {

  let [shoes] = useState(data) // 대충 서버에서 받아온 데이터
  let navigate = useNavigate(); // 함수반환


  return (
    <div className='App'>

      <Navbar bg="dark" data-bs-theme="dark" fixed='top'>
        <Container fluid>
          <Navbar.Brand href="#home">Shooop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Link to="/">홈</Link>
      <Link>홈</Link>
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map((data, i) => {
                    return(
                      <Item shoes = {data} i = {i+1} />
                    )
                  })
                }
              </div>
            </div>
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

