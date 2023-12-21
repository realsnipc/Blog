import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";

  // If user is logged in, then define username 
  if (userInfo) {
    var username = userInfo.username;
  }

  // Clear token on logout
  function logout() {
    fetch(backendUrl + '/logout', {
      credentials: 'include'
    });
    setUserInfo(false);
    window.location = "/";
  }
  // Get user data 
  useEffect(() => {
    try {
      // Fetch cookie if user is logged in (checks if userinfo is null)
      if (!userInfo) {
        fetch(backendUrl + '/profile', {
          credentials: 'include',
        }).then(res => {
          res.json().then(userInfo => {
            setUserInfo(userInfo);

          });
        });
      }

      // handle error if any
    } catch (error) {
      setUserInfo(null);
    }

  }, []);
  return (
    <>
      <header>
        <Link id='logo' to='/'>Sni<span>Blogs</span></Link>
        <nav>
          {/* set navbar if username (i.e userInfo) is available */}
          {
            userInfo && (
              <>
                <Link className='nav_item'>{username}</Link>
                <Link to='/create' className='nav_item'>Create</Link>
                <Link className='nav_item' onClick={logout}>Logout</Link>
              </>
            )
          }
          {/* if userInfo is not available (user is not logged in ) */}
          {
            !userInfo && (
              <>
                <Link to="/login" className='nav_item'>Login</Link>
                <Link to="" className='nav_item'>Source</Link>
              </>
            )
          }
        </nav>
      </header>
    </>
  );
}

export default Header;