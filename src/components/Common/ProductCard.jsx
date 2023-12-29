import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import './ProductCard.css'
import star from '../../assets/white-star.png'
import basket from '../../assets/basket.png'
import { useContext } from 'react';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';
import config from '../../config.json'

const ProductCard = ({product}) => {
  
    const { addToCart } = useContext(CartContext);
    const user = useContext(UserContext);

    return (
        <article className="product_card">
            <div className="product_image">
                <Link to={`/product/${product._id}`}>
                    <img src={`${config.backendURL}/products/${product.images[0]}`} alt="Product Image" />
                </Link>
            </div>

            <div className="product_details">
                <h3 className="product_price">${product.price}</h3>

                <p className="product_title">{product.title}</p>

                <footer className="align_center product_info_footer">
                    <div className="align_center">
                        <p className="align_center product_rating">
                            <img src={star} alt="Star" /> {product.reviews.rate}
                        </p>
                        <p className="product_review_count">{product.reviews.count}</p>
                    </div>

                    {
                        product.stock > 0 && user &&
                        <button 
                            className="add_to_cart"
                            onClick={() => addToCart(product, 1)}
                        >
                            <img src={basket} alt="Basket Button" />
                        </button>
                    }
                </footer>
            </div>
        </article>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}

export default ProductCard