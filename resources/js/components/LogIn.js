import React, { useEffect, useState } from 'react';
import '../../css/login.css';

const LogIn = (props) => {

    const [id, setID] = useState([]);
    const [name, setName] = useState([]);
    
    const user = {
        'id': id,
        'name': name
    };

    const handleLogIn = event => {
        event.preventDefault();

        if (user.id && user.name) {
            axios.post('/api/login', user)
            .then(response => {
                sessionStorage.setItem("user", JSON.stringify(response.data));
                setID('');
                setName('');
                props.setLogin(false);
                props.setHeader(true);
                props.setUserCallBack(user);
            });
        }
    };

    const handleInputID = event => {
        setID(event.target.value);
    };

    const handleInputName = event => {
        setName(event.target.value);
    };

    return props.isShowing == true ? (
        
        <div className='row justify-content-center'>
            <div className="wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog"></div>
            <div className='col-sm-6 block-content'>
                <div className='card middle radius-15 text'>
                    <div className='card-header border-header'>Login</div>
                        <div className='card-body'>
                        <form onSubmit={handleLogIn} >
                            <div className='form-group'>
                            <input type="text" 
                                required
                                className="form-control" 
                                placeholder="Id"
                                value = {id}
                                onChange={handleInputID}
                                />
                            <input type="text" 
                                required
                                className="form-control mt-3" 
                                placeholder="Name"
                                value = {name}
                                onChange= {handleInputName}
                                />
                                <button className='btn form-control btn-block btn-primary m-0 mt-3'>Login</button>
                            </div>
                            
                        </form>
                        </div>
                    </div>
                </div>
            
        </div>
    ): null;
};
export default LogIn;