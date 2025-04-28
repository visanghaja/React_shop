import { useState } from "react";

export function useLike(){
    let [like, setLike] = useState(0)
    function addLike(){
        setLike(a => a+1) // a에는 원래 state 들어감
    }
    
    return [like, addLike]; // 이렇게 해서 함수 바깥에서 쓸 수 있도록
}