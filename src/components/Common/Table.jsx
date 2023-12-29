import './Table.css'
import PropTypes from 'prop-types'

const Table = ({headings, children}) => {
  return (
    <table className="common_table">
        <thead>
            <tr>
                {headings.map((h, index) => 
                    <th  key={index}>
                        {h}
                    </th>
                )}
            </tr>
        </thead>
        
        {children}
    </table>
  )
};

Table.propTypes = {
    headings: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.object.isRequired,
}

export default Table