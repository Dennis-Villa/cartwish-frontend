import  PropTypes from 'prop-types'

import './HeroSection.css'
import { Link } from 'react-router-dom'

const HeroSection = ({title, subtitle, link, image}) => {
  return (
    <section className="hero_section">
        <div className="align_center">
            <h2 className="hero_title">{title}</h2>
            <p className="hero_subtitle">{subtitle}</p>
            <Link to={link} className="hero_link">Buy Now</Link>
        </div>
            <img src={image} alt="" className="hero_image" />
        <div className="align_center">

        </div>
    </section>
  )
}

HeroSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

export default HeroSection