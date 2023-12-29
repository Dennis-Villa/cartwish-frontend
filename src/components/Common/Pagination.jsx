import PropTypes from 'prop-types';

import './Pagination.css'

const Pagination = ({totalPosts, postPerPage, onClick, currentPage}) => {
  
    currentPage = currentPage || '1';

    let pages = [];

    for (let index = 1; index <= Math.ceil(totalPosts/postPerPage); index++) {
        pages.push(index);
    }

    return (
        <div className="pagination">
            {
                pages.length > 1 &&
                pages.map(page => <li key={page}>
                    <button 
                        className={"pagination_button" + 
                        (parseInt(currentPage) === page ? " active" : '')}
                        onClick={() => onClick(page)}
                    >
                        {page}
                    </button>
                </li>)
            }
        </div>
    )
}

Pagination.propTypes = {
    totalPosts: PropTypes.number,
    postPerPage: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    currentPage: PropTypes.string,
}

export default Pagination