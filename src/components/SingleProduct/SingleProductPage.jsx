import { useContext, useState } from 'react';
import './SingleProductPage.css'
import QuantityInput from '../Common/QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from './../Common/Loader';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';
import config from '../../config.json'

const SingleProductPage = () => {

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useContext(CartContext);
    const user = useContext(UserContext);

    const {id} = useParams();

    const {data, error, isLoading} = useData(`/products/${id}`);
    const {description, images, price, title, stock} = data || {};

    return (
        <section className="align_center single_product">
            {
                isLoading && <Loader />
            }
            {
                error 
                && <em className='form_error'>{error}</em>
            }
            {
                data &&
                <>
                    <div className="align_center">
                        <div className="single_products_thumbnails">
                            {images.map((image, index) => <img
                                src={`${config.backendURL}/products/${image}`}
                                alt={title}
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={selectedImage === index ? "selected_image" : ""} />
                            )}
                        </div>

                        <img src={`${config.backendURL}/products/${images[selectedImage]}`} alt={title} className='single_product_display' />
                    </div>
                    <div className="single_product_details">
                        <h1 className="single_product_title">
                            {title}
                        </h1>

                        <p className="single_product_description">
                            {description}
                        </p>

                        <p className="single_product_price">
                            ${price.toFixed(2)}
                        </p>

                        {
                            user &&
                            <>
                                <h2 className="quantity_title">
                                    Quantity:
                                </h2>
                                <QuantityInput
                                    stock={stock}
                                    quantity={stock ? quantity : 0}
                                    setQuantity={setQuantity}
                                />
                                <button
                                    className="search_button add_cart"
                                    disabled={!stock}
                                    onClick={() => {
                                        addToCart(data, quantity)
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </>
                        }
                    </div>
                </>
            }
        </section>
    )
};

export default SingleProductPage