import { rules } from "eslint-plugin-react-refresh";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {

    let [alert, change_alert] = useState(false)

    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x){ // find 쓰면 array 자료안에서 원하는 항목만 가져올 수 있음!
        return x.id == id
    });

    useEffect(() => {
        let a = setTimeout(()=>{ change_alert(false) }, 2000) 

        return () => {
            clearTimeout(a) // timer 가 백지상태에서 시작할 수 있도록
        }
    }, [alert])

    return(

        <>
            <div className="container">
                
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{찾은상품.title}</h4>
                        <p>{찾은상품.content}</p>
                        <p>{찾은상품.price}</p>
                        <button className="btn btn-danger">주문하기</button>
                        {alert ? <div className="alert alert-warning">경고 : 숫자만 입력하세요</div> : null} 
                        <input onChange={(e) => {
                            if (isNaN(e.target.value)) {
                                change_alert(true)
                            }
                        }}></input>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Detail;