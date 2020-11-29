import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const NoTaskModal = ({ isShowing, hide, showNewTask }) => isShowing == true ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className='row justify-content-center'>
            <div className='col-md-4'>
                <div className='card mt-middle'>
                    <div className='card-header text-center'>You have no task</div>
                    <button  
                        className='btn btn-primary'
                        onClick={() => { 
                            hide(false);
                            showNewTask(true);
                        }}
                    >+ New Task</button>
                </div> 
            </div>
        </div>
    </div>
  </React.Fragment>, document.getElementById("portal")
) : null;

export default NoTaskModal;