import React, { useEffect } from 'react';
import '../../css/header.css';

const customStyles = {
  background: 'FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 6px #00000029',
  opacity: 1,
  height: '70px',
  padding: '18px 0'
};



const Header = (props) => {
  return props.isShowing == true ? (
    <div className="row justify-content-center" style={customStyles}>
      <div className="col-xs-12 col-md-10">
        <nav className='navbar' >
          <div className='container'>
         <a className="avatar"></a>
          <span className="name">{props.user.name}</span>
            <a href="#"
              onClick={
                () => { 
                  props.doLogOut(),
                  props.setShowTaskListCallBack(false)
                }}
              >
              Logout
            </a>
          </div>
        </nav>
      </div>
    </div>
  ):null;
  };

export default Header;
