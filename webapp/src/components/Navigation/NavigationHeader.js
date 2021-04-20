import Cookies from 'js-cookie';
import react, { useContext } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import UserContext from './../../contexts/UserContext';

const NavigationHeader = (props) => {
    const { setIsAuthenticated } = useContext(UserContext);
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('googleId');
        Cookies.remove('tokenId');
        setIsAuthenticated(false);
        props.history.push("signup");
    }

    return (
        <nav className="topnav">
            <Link className="navbar-brand" href="#">
                <div className="logo-image">
                    <img src="https://wallpapercave.com/wp/wp2048440.jpg" className="img-fluid" />
                </div>
            </Link>
            <Link onClick={logout}>Logout</Link>
            <Link to="/profile">Edit Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <span className="activeRight"> Northeastern University</span>

        </nav>)
}

export default withRouter(NavigationHeader);