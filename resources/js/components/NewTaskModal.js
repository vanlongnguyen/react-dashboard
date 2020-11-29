import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom';
import '../../css/newtask.css';


const modalStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    background: "#00000033 0% 0% no-repeat",
    opacity: 1,
    display: "block",
    zIndex: 10
};
const customStyles = {
    top: "20vh",
    zIndex: 20
};

const NewTaskModal = (props) => {

  const [taskTitle, setTitle] = useState('');
  const headTitle = !props.isUpdate ? '+ New Task' : 'Update Task';

  const handleUpdateTask = (e) => {
    e.preventDefault();
    
    const task = {
      title: taskTitle,
      id: props.updatedId
    }
    if (props.isUpdate && props.updatedId != -1) {
      
      axios.put('/api/tasks/update/'+ props.updatedId, task)
      .then(response => {
        const newArr = [...props.tasks];
        newArr.map((item) => {
            if (item.id == props.updatedId) {
                item.title = taskTitle;
            }
        });
        props.updateList(newArr);
        props.hideModal(false);
      })
    }
  }

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const task = {
        title: taskTitle,
        userId: props.user.id
    }
    console.log(task);
    axios.post('/api/tasks/create/', task)
      .then(response => {
        props.addTaskList(response.data);
        setTitle('');
        props.hideModal(false);
        props.updateStaticListCallBack(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    props.isShowing == true ?
    ReactDOM.createPortal(
      <React.Fragment>
          <div className="modal-overlay"
            onClick= {
              () => {
                props.hideModal(false)
              }
            }
          />
          {/* <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog"> */}
                
        <div className='content-block'>
          <div className='card'>
            <div className='card-header'>{ headTitle }</div>
            <div className='card-body'>
              <form onSubmit={ 
                !props.isUpdate ? e => handleAddNewTask(e) :
                e => handleUpdateTask(e)
                }>
                <div className='form-group'>
                  <input
                    className="w-100 input-text"
                    type='text'
                    required
                    maxLength='100'
                    onChange={
                      e => {setTitle(e.target.value);
                      }
                    }
                    value={taskTitle}
                    name='name'
                    placeholder='Task Name'
                  />
                </div>
                <button className='btn btn-primary w-100'>{ headTitle }</button>
              </form>
            </div>
          </div>
        </div>
                
              
        </React.Fragment>, document.getElementById("portal")
    ): null
  )
};

export default NewTaskModal;