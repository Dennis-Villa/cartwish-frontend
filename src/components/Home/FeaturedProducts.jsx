import './FeaturedProducts.css'
import ProductCard from '../Common/ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from '../Products/ProductCardSkeleton';

const FeaturedProducts = () => {

  const { data: products, error, isLoading } = useData("/products/featured");
  const skeletons = [1, 2, 3];

  return (
    <section className="featured_products">
        <h2>Featured Products</h2>

        <div className="align_center featured_products_list">
            {
              error &&
              <em className="form_error">
                {error}
              </em>
            }
            {
              products &&
              products.map(product => <ProductCard 
                product={product}
                key={product._id}
              />)
            }
            {
              isLoading &&
              skeletons.map(s => <ProductCardSkeleton key={s} />)
            }
        </div>
    </section>
  )
}

export default FeaturedProducts