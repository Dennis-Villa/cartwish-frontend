import './QuantityInput.css'
import PropTypes from 'prop-types';

const QuantityInput = ({ stock, quantity, setQuantity, cartPage, productId }) => {

  const handleQuantity = (operation) => {
    if(operation === '-'){
      cartPage
      ? setQuantity(productId, -1)
      : setQuantity(prev => prev - 1);
    }
    else{
      cartPage
      ? setQuantity(productId, 1)
      : setQuantity(prev => prev + 1);
    }
  };

  return (
    <div className="align_center quantity_input">
        <button 
          className="quantity_input_button" 
          onClick={() => handleQuantity('-')}
          disabled={quantity <= 1}
        >
            {" "}
            -{" "}
        </button>

        <p className="quantity_input_count">
            {stock ? quantity : 0}
        </p>

        <button 
          className="quantity_input_button"
          onClick={() => handleQuantity('+')}
          disabled={quantity >= stock}
        >
            +
        </button>
    </div>
  )
}

QuantityInput.propTypes = {
  stock: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  cartPage: PropTypes.bool,
  productId: PropTypes.string,
};

export default QuantityInput