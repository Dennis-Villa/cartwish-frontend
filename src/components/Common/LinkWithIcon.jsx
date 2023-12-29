import { NavLink } from "react-router-dom"
import  PropTypes from 'prop-types'

import './LinkWithIcon.css'

const LinkWithIcon = ({ title, link, icon, sidebar }) => {
  return (
    <NavLink to={link} className={"align_center" + (sidebar ? " sidebar_link" : "")}>
        {title} 
        <img src={icon} alt="Rocket Emoji" className="link_emoji" />
    </NavLink>
  )
}

LinkWithIcon.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    sidebar: PropTypes.bool,
}

export default LinkWithIcon