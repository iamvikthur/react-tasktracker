import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onToggle, formIsOpen }) => {
    const location = useLocation()
    return (
        <header className="header">
            <h1>{title}</h1>
            { location.pathname === '/' && <Button onClick={onToggle} color={formIsOpen ? 'red': 'green'} text={formIsOpen ? 'Close' : 'Add' } />}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
