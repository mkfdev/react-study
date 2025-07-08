import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Context1 } from './../App.js';

// class Detail2 extend React.Component {
//   componentDidMount(){

//   }
//   compnentDidUpdate(){

//   }
//   componentWillUnmout(){

//   }
// }

function Detail(props) {

  let { stock } = useContext(Context1)

  let [count, setCount] = useState(0);
  let [alert, setDisplay] = useState(true);
  let [text, setText] = useState('');
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');

  useEffect(()=> {
    let a = setTimeout( () => { setDisplay(false) }, 2000 )
    console.log(2);

    return () => { //mount시 실행안됨, unmount 시 실행됨
      console.log(1);
      //useEffect 동작전에 실행되는 코드
      clearTimeout(a)
    }
  })
  
  useEffect(()=> {
    setFade2('end')
    return () => {
      setFade2('');
    }
  },[])


  let {id} = useParams();

  let products = props.shoes.find((p)=> p.id == id);

  
  return (
    <div className={`container start ${fade2}`}>
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


      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{ setTab(0) }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{ setTab(1) }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{ setTab(2) }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} shoes={props.shoes}/>

    </div> 
  );
}

function TabContent({tab, shoes}) {

  let [fade, setFade] = useState('')
  let {stock} = useContext(Context1);

  useEffect(() => {

    let a = setTimeout(() => { setFade('end') }, 100)

    return () => {
      clearTimeout(a)
      setFade('')
    }
  }, [tab])
  //automatic batching
  return( 
    <div className={'start '+fade}>
      {[<div className="start end">{shoes[0].title}</div>,<div>{ stock[1] }</div>,<div>내용2</div>][tab]}
    </div>
  )
}


export default Detail;
