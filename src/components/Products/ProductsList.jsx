import { useSearchParams } from 'react-router-dom';
import useData from '../../hooks/useData';

import ProductCard from '../Common/ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton';
import './ProductsList.css'
import { useEffect, useState } from 'react';
// import Pagination from '../Common/Pagination';

const ProductsList = () => {

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const {data, error, isLoading} = useData("/products", {
    params: {
      search,
      category,
      page,
    }
  }, [search, category, page]);
  const {products} = data || {products: null};

  

  useEffect(() => {

    const handleScroll = () => {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
      
      if( (scrollTop + clientHeight >= scrollHeight - 1) && !isLoading && data && page < data.totalPages){
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, data, isLoading]);
  
  useEffect(() => {
    setPage(1);
  }, [category, search])
  
  useEffect(() => {
    if(data && data.products){
      const products = [...data.products];

      if(sortBy === ""){
        setSortedProducts(products);
      }
      else if(sortBy === "price desc"){
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      }
      else if(sortBy === "price asc"){
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      }
      else if(sortBy === "rate desc"){
        setSortedProducts(products.sort((a, b) => b.reviews.rate - a.reviews.rate));
      }
      else if(sortBy === "rate asc"){
        setSortedProducts(products.sort((a, b) => a.reviews.rate - b.reviews.rate));
      }
    }
  }, [sortBy, data]);
  

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>

            <select 
              name="sort" 
              className="products_sorting"
              onChange={e => setSortBy(e.target.value)}
            >
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Rate HIGH to LOW</option>
                <option value="rate asc">Rate LOW to HIGH</option>
            </select>
        </header>

        <div className="products_list">
            {
              error && <em className='form_error'>
                {error}
              </em>
            }
            { 
              products &&
              sortedProducts.map(product => 
              <ProductCard key={product._id} product={product} />)
            }
            {
              isLoading 
              && skeletons.map(
                skeleton => <ProductCardSkeleton key={skeleton}/>
              ) 
            }
        </div>
        
        {/* <Pagination 
          totalPosts={data?.totalProducts}
          postPerPage={8}
          currentPage={page}
          onClick={handlePageChange}
        /> */}
    </section>
  )
}

export default ProductsList