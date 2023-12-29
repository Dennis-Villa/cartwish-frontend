import useData from '../../hooks/useData'

import LinkWithIcon from '../Common/LinkWithIcon'
import './ProductsSidebar.css'

const ProductsSidebar = () => {

  const {data: categories, error} = useData('/category');

  return (
    <aside className="products_sidebar">
        <h2>Category</h2>

        <div className="category_links">
          {error && <em className='form_error'>{error}</em>}
          {
            categories &&
            categories.map(({_id, name, image}) => {
              return (
                <LinkWithIcon 
                  key={_id}
                  title={name}
                  link={`/products?category=${name}`}
                  icon={`http://localhost:5000/category/${image}`}
                  sidebar={true}
                />
              )
            })
          }
          </div>
    </aside>
  )
}

export default ProductsSidebar