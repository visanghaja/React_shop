import { rules } from "eslint-plugin-react-refresh";
import { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from 'react-bootstrap'
// import {Context1} from './../App.jsx'
import { append } from "../store";
import { useDispatch } from "react-redux";

function Detail(props) {
    // let {재고, shoes} = useContext(Context1)

    let [fade2, setFade2] = useState('')
    let [alert, change_alert] = useState(false)
    let [탭, 탭변경] = useState(0)

    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x){ // find 쓰면 array 자료안에서 원하는 항목만 가져올 수 있음!
        return x.id == id
    });

    let dispatch = useDispatch()

    useEffect(() => {
        let a = setTimeout(()=>{ change_alert(false) }, 2000) 

        return () => {
            clearTimeout(a) // timer 가 백지상태에서 시작할 수 있도록
        }
    }, [alert])

    useEffect(() => {
        let history = localStorage.getItem('watched')
        history = JSON.parse(history)
        history.push(찾은상품.id)
        
        // Set으로 바꿨다가 다시 array 로 만들기
        history = new Set(history)
        history = Array.from(history) // array -> Set -> array
        localStorage.setItem('watched', JSON.stringify(history))

        setFade2('end')
        return(() => {
            setFade2('')
        })
    }, [])
    

    return(

        <div>
            <div className={"container start " + fade2}>
                
                <div className="row">
                    <div className="col-md-6">
                        <img src= {'https://codingapple1.github.io/shop/shoes' + (찾은상품.id+1) + '.jpg'} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{찾은상품.title}</h4>
                        <p>{찾은상품.content}</p>
                        <p>{찾은상품.price}</p>
                        <button className="btn btn-danger" onClick={()=>{
                            dispatch(append({id : 찾은상품.id, name : 찾은상품.title, count : 1}))
                        }}>주문하기</button>
                        {alert ? <div className="alert alert-warning">경고 : 숫자만 입력하세요</div> : null} 
                        <input onChange={(e) => {
                            if (isNaN(e.target.value)) {
                                change_alert(true)
                            }
                        }}></input>
                    </div>
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0"> 
                <Nav.Item>
                    <Nav.Link onClick={() => {탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭 = {탭} />
            
            
            
        </div>
    )
}

function TabContent(props){
    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => {setFade('end')}, 100) // 뗐다 붙이기! 
        return(() => {
            setFade('')
        })
    }, [props.탭]) // 탭 변할때마다 실행!


    // 한 div 로 감싸서 className 통일! (className 띄워서 쓰면 여러개 중복 가능!)
    return (<div className={'start ' + fade}> 
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭]}
    </div>) 
}


export default Detail;