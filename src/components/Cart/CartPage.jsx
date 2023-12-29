import './CartPage.css'
import remove from '../../assets/remove.png'
import Table from '../Common/Table'
import QuantityInput from '../Common/QuantityInput'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import { checkoutAPI } from '../../services/orderServices'
import { toast } from 'react-toastify'
import config from '../../config.json'

const CartPage = () => {

    const [subTotal, setSubTotal] = useState(0);
    const user = useContext(UserContext);
    const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

    useEffect(() => {

        let total = 0;
        cart.forEach(element => {
            total += element.product.price * element.quantity;
        });

        setSubTotal(total);
    }, [cart]);
    
    const checkout = () => {

        checkoutAPI()
        .then(() => {
            toast.success("Order placed successfully");
            setCart([]);
        })
        .catch(() => {
            toast.error("Something went wrong");
        });

    };

    return (
        <section className="align_center cart_page">
            <div className="align_center user_info">
                {
                    user &&
                    <img src={`${config.backendURL}/profile/${user?.profilePic}`} alt="User Profile" />
                }

                <div>
                    <p className="user_name">{user?.name}</p>
                    <p className="user_email">{user?.email}</p>
                </div>
            </div>

            <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]} >
                <tbody>
                    {
                        cart.map(({product, quantity}) => 
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td className='align_center table_quantity_input'>
                                    <QuantityInput 
                                        stock={product.stock}
                                        quantity={quantity}
                                        setQuantity={
                                            updateCart
                                        }
                                        cartPage={ true }
                                        productId={ product._id }
                                    />
                                </td>
                                <td>${product.price * quantity}</td>
                                <td>
                                    <img 
                                        src={remove} 
                                        alt="Remove Icon" 
                                        className='cart_remove_icon' 
                                        onClick={() => {
                                            removeFromCart(product._id);
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </Table>

            <table className="cart_bill">
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${subTotal}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charge</td>
                        <td>$5</td>
                    </tr>
                    <tr className='cart_bill_final'>
                        <td>Total</td>
                        <td>${subTotal + 5}</td>
                    </tr>
                </tbody>
            </table>

            <button 
                className="search_button checkout_button"
                onClick={checkout}
            >
                Checkout
            </button>
        </section>
    )
}

export default CartPage