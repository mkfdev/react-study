import { useEffect, useState } from "react";
import { Navbar,Container,Nav,Row,Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import styled from 'styled-components';
import axios from "axios";

let YellowBtn = styled.button`
  background: ${ props => props.bg };
  color: ${ props => props.bg == 'blue' ? 'white' : 'black' };
  padding: 10px;
`
let Box = styled.div`
  background: grey;
  padding: 20px;
`

function App() {

  let [shoes, setShoes] = useState(data);
  let [cnt, addCnt] = useState(0);
  let [isLoading, setLoading] = useState(false);
  let [moreBtn, setMoreBtn] = useState(true)
  let navigate = useNavigate();

  return (
    <div className="App">

      <Box>
      <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="orange">버튼</YellowBtn>
      </Box>

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}





      <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg" style={{ backgroundImage : 'url('+bg+')' }}></div>
          <Container>
            <Row>
              {/* <Product shoes={shoes[0]} i={1}></Product>
              <Product shoes={shoes[1]} i={2}></Product>
              <Product shoes={shoes[2]} i={3}></Product> */}

              {
                shoes.map((a,i) => {
                  return (
                    <Product shoes={shoes[i]} i={shoes[i].id} key={i}></Product>
                  )
                })
              }
            </Row>
        </Container>
        {
          isLoading ?  <p>isLoading...</p> : null
        }
        
        { 
          moreBtn ? 
          <button onClick={()=>{
          // axios.get('https://codingapple1.github.io/shop/data2.json')
          // .then((d)=>{
          //   let c = [...shoes, ...d.data];
          //   setShoes(c);
          // })
          // .catch(() => {
          //   console.log('실패함')
          // })
          isLoading ? setLoading(isLoading) : setLoading(!isLoading);
          Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')])
          .then(
            (res) => { //배열로 반환
              addCnt(cnt+1);

              console.log(res[0].data, res[1].data);
              console.log('cnt: '+cnt);

              if(cnt === 0) {
                let copy = [...shoes, ...res[0].data];
                setShoes(copy);
              }else if(cnt === 1){
                let copy = [...shoes, ...res[1].data];
                setShoes(copy);
                setMoreBtn(false);
              }
              

              isLoading ? setLoading(!isLoading) : setLoading(isLoading);
            }
          )
          .catch(
            (err)=> {
              isLoading ? setLoading(isLoading) : setLoading(!isLoading);
              console.log('error: '+err);
            }
          )
          }}>버튼</button>
          : null
        }
      </>
    } /> 
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />


        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임.</div>} />
          <Route path="location" element={<div>위치정보임.</div>}/>
        </Route>

        
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

        <Route path="*" element={<div>없는페이지다</div>}></Route>
      </Routes>

      

      

      
    </div>
  );
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function About(){
  return (
    <div>
      <h4>회사정보~~</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Product(props) {
  return (
    <Col md={4}>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) + '.jpg'} width="80%" alt=""/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App;
