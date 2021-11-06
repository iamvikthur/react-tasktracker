import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onToggle, formIsOpen }) => {

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button onClick={onToggle} color={formIsOpen ? 'red': 'green'} text={formIsOpen ? 'Close' : 'Add' } />
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
