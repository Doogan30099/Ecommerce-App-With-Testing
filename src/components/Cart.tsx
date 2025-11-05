import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store"
import { removeFromCart, clearCart } from "../redux/cartSlice";


export default function Cart() {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items
        .reduce((sum, i) => sum + i.quantity * i.price, 0)
        .toFixed(2);


    if (items.length === 0) {
        return <span className="badge bg-secondary">Cart Empty</span>
    }


    return (
        <div className="dropdown">
            <button 
                className="btn btn-outline-primary dropdown-toggle"
                data-bs-toggle="dropdown">
                    Cart ({totalItems}) - ${totalPrice}
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-3" style={{minWidth: "300px"}}>
                {items.map((item) => (
                    <li 
                        key={item.id}
                        className="d-flex justfy-conten-between align-items-center mb-2"
                    >
                        <span className="text-truncate" style={{width: "60%" }}>
                            {item.title}
                        </span>
                        <span>x{item.quantity}</span>
                        <button 
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            X
                        </button>   
                    </li>
                ))}
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li className="text-end">
                    <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => {
                            alert("Checkout successful")
                            dispatch(clearCart());
                        }}
                    >
                        Checkout
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => dispatch(clearCart())}
                    >
                       Clear 
                    </button>
                </li>
            </ul>
        </div>
    );
}