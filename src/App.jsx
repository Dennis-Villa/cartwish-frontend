import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getJWT, getUser, logout } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from './services/cartServices'
import { ToastContainer, toast } from 'react-toastify'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from './contexts/UserContext'
import CartContext from './contexts/CartContext'

setAuthToken(getJWT());

const App = () => {

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {

      const jwtUser = getUser();

      if(jwtUser){

        if(Date.now() >= jwtUser.exp * 1000){
          logout();
          location.reload();
        }
        else {
          setUser(jwtUser); 
        }
      }

  }, []);
  
  const addToCart = (product, quantity) => {

    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id);
  
    if(productIndex === -1){
      updatedCart.push({ product, quantity });
    }
    else{
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
    .then(() => {
      toast.success("Product Added Successfully");
    })
    .catch(() => {
      toast.error("Failed to add product");
      setCart(cart);
    });

  };

  const removeFromCart = (id) => {
    
    const oldCart = [...cart];
    const newCart = oldCart.filter(item => item.product._id !== id);

    setCart(newCart);

    removeFromCartAPI(id)
    .catch(() => {
      toast.error("Something went wrong");
      setCart(cart);
    });

  };

  const updateCart = (id, quantity) => {
    
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id === id);
  
    updatedCart[productIndex].quantity += quantity;
    setCart(updatedCart);

    if(quantity === 1){
      increaseProductAPI(id)
      .catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    }
    else {
      decreaseProductAPI(id)
      .catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    }
    
    

  };

  const getCart = () => {

    getCartAPI()
    .then(resp => {
      setCart(resp.data);
    })
    .catch(() => {
      toast.error("Someting went wrong");
    });

  };
  
  useEffect(() => {
    if(user){
      getCart();
    }
  }, [user]);
  

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, setCart }}>
        <div className="app">
        <Navbar />

        <main>
          <ToastContainer position='bottom-right' />
          <Routing addToCart={addToCart} cart={cart} />
        </main>
      </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App