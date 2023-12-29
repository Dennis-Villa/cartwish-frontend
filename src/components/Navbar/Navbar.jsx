import { Link, NavLink, useNavigate } from 'react-router-dom'

import './Navbar.css'
import rocket from '../../assets/rocket.png'
import star from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from '../Common/LinkWithIcon'
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext';
import { getSuggestionsAPI } from '../../services/productServices'

const Navbar = () => {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if( search.trim() !== "" ){
      navigate(`/products?search=${search.trim()}`);
    }

    setSuggestions([]);
  };

  const handleKeyDown = (e) => {

    if(selectedItem < suggestions.length){
      if( e.key === "ArrowDown"){
        setSelectedItem((current) =>
          (current === suggestions.length - 1
          ? 0
          : current + 1)
        );
      }
      else if( e.key === "ArrowUp"){
        setSelectedItem((current) =>
          (current <= 0
          ? suggestions.length - 1
          : current - 1)
        );
      }
      else if( e.key === "Enter" && selectedItem > -1){
        const suggestion = suggestions[selectedItem];

        navigate(`/products?search=${suggestion.title}`);

        setSearch("");
        setSuggestions([]);
      }
    }
    else{
      setSelectedItem(-1);
    }
  };

  useEffect(() => {

    const delaySuggestions = setTimeout(() => {
      if( search.trim() !== "" ){
        getSuggestionsAPI(search)
        .then(resp => {
          setSuggestions(resp.data);
        })
        .catch(error => {
          console.log(error);
        });
      }
      else{
        setSuggestions([]);
      }
    }, 300);    
    
    return () => {
      clearTimeout(delaySuggestions);
    };

  }, [search]);

  return (
    <nav className='align_center navbar'>
      <div className='align_center'>
        <h1 className="navbar_heading">CartWish</h1>

        <form 
          className="align_center navbar_form" 
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            className="navbar_search" 
            placeholder='Search Products'
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={handleKeyDown}
          />

          <button type="submit" className='search_button'>
            Search
          </button>

          {
            suggestions.length > 0 && 
            <ul className="search_result">
              {
                suggestions.map((s, index) => 
                  <li 
                    className={"search_suggestion_link" + 
                      (selectedItem === index
                      ? " active"
                      : "")
                    } 
                    key={s._id}
                  >
                    <Link 
                      to={`/products?search=${s.title}`} 
                      onClick={() => {
                        setSearch("");
                        setSuggestions([]);
                      }}
                    >
                      {s.title}
                    </Link>
                  </li>
                )
              }
            </ul>
          }
        </form>
      </div>

      <div className='align_center navbar_links'>
        <LinkWithIcon title="Home" link="/" icon={rocket} />
        <LinkWithIcon title="Products" link="/products" icon={star} />
        
        {
          !user &&
          <>
            <LinkWithIcon title="LogIn" link="/login" icon={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" icon={memo} />
          </>
        }
        {
          user &&
          <>
            <LinkWithIcon title="My Orders" link="/myorders" icon={order} />
            <LinkWithIcon title="Logout" link="/logout" icon={lock} />

            <NavLink to="/cart" className='align_center'>
              Cart <p className="align_center cart_counts"> {cart.length}</p>
            </NavLink>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar