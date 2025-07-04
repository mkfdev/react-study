import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// class Detail2 extend React.Component {
//   componentDidMount(){

//   }
//   compnentDidUpdate(){

//   }
//   componentWillUnmout(){

//   }
// }

function Detail(props) {

  let [count, setCount] = useState(0);
  let [alert, setDisplay] = useState(true);
  let [text, setText] = useState('');

  useEffect(()=> {
    let a = setTimeout( () => { setDisplay(false) }, 2000 )
    console.log(2);

    return () => { //mount시 실행안됨, unmount 시 실행됨
      console.log(1);
      //useEffect 동작전에 실행되는 코드
      clearTimeout(a)
    }
  })
  


  let {id} = useParams();

  let products = props.shoes.find((p)=> p.id == id);

  
  return (
    <div className="container">
      {
        alert == true ?
        <div className="alert alert-warning">
          2초이내 구매시 할인
        </div>
        : null
      }
      {count}
      <button onClick={() => {setCount(count+1)}}>클릭</button>
      
      
      
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes'+ (products.id + 1) +'.jpg'} width="100%" alt=""/>
        </div>
        <div className="col-md-6">
          <input type="text" onChange={(e) => {setText(e.target.value)}}/>
          {
            !(/^[0-9]*$/.test(text)) ? 
            <p>숫자만 입력하세요!</p>
            : null
          }
          
          <h4 className="pt-5">{products.title}</h4>
          <p>{products.content}</p>
          <p>{products.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  );
}

export default Detail;
