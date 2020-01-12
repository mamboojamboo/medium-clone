import React, { useContext, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/currentUser';

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          Medium
        </Link>

        <ul className='nav navbar-nav pull-xs-right'>

          <li className='nav-item'>
            <NavLink className='nav-link' to='/' exact>
              Home
            </NavLink>
          </li>

          {currentUserState.isLoggedIn === false && (
            <Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Sign in
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Sign up
                </NavLink>
              </li>
            </Fragment>
          )}
          {currentUserState.isLoggedIn === true && (
            <Fragment>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/article/new'>
                <i className='ion-compose'></i>
                &nbsp; New Post
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='/settings'>
                <i className='ion-gear-a'></i>
                &nbsp; Settings
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to={`/profile/${currentUserState.currentUser.username}`}>
                <img className='user-pic' src={currentUserState.currentUser.image} alt='' />
                &nbsp; {currentUserState.currentUser.username}
              </NavLink>
            </li>
          </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
