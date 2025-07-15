import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../store';

function Cart(){

    let a = useSelector((state) => {return state} );
    let dispatch = useDispatch() //store에 있는 함수사용하기

    let stock = useSelector((state) => {return state.stock} );
    console.log(stock);
    return (
        
        <div>
            { a.user }의 장바구니
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
                        stock.map((data,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td><button onClick={()=>{ dispatch(changeName()) }}>+</button></td>
                                </tr>          
                            )
                        })
                    }
                    
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;