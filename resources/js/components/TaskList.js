import React, { useEffect, useState } from 'react';
import '../../css/tasklist.css';
import '../../css/circle.css';


const TaskList = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    doSearch();
  }, [searchTerm]);
  
  const handleSearchTermInput = event => {
    if (event.target.value == '') {
        props.updateTaskListCallBack(props.tasks);
    }
    setSearchTerm(event.target.value.toLowerCase());
  };

  const doSearch = () => {
    const newArr = [...props.staticList];
    const results = newArr.filter(task =>
        task.title.toLowerCase().includes(searchTerm)
    );
    
    if (results.length != 0) {
        props.updateTaskListCallBack(results);
    } else {
        // console.log('search term is not matched');
    }
}
const handleMarkTaskAsCompleted = index => e => {
  let id = e.target.value;
  axios.put(`/api/tasks/${id}`)
      .then(response => {
          const newArr = [...props.tasks];
          newArr.map((item) => {
              if (item.id == id) {
                  item.is_completed = "1";
                  // console.log(item);
              }
          });
          props.updateTaskListCallBack(newArr);
          getCompletedTasks(newArr);
      })
      .catch(error => {
          console.log(error);
      })
}

const handleDeleteTask = index => e => {
  let id = e.target.value;
  axios.delete(`/api/tasks/delete/${id}`)
      .then(response => {
          const newArr = props.tasks.filter((item) => item.id != id);
          props.updateTaskListCallBack(newArr);
          props.handleNoTaskModalCallBack(newArr);
          props.setStaticListCallBack(newArr);
          getCompletedTasks(newArr);
      })
      .catch(error => {
          console.log(error);
      })
}

const getCompletedTasks = (data) => {
  let num = 0;
  data.map((task, index) => {
      
      if (task.is_completed == '1') {
          console.log('count');
          num ++;
      }
      
  });
  return num;
}

const latestTasks = [...props.tasks];
let totalTasks = props.tasks.length;
let completed = getCompletedTasks(props.staticList);
let percent = Math.round((completed / props.staticList.length) * 100);
let pClass = `c100 p${percent}`;

  return props.isShowing == true ? (
    <div className="row justify-content-center mt-3">
      <div className="col-xs-12 col-md-10">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="bg-white">
              <h4>Tasks Completed</h4>
              <span className="big-title">{completed}</span>
              / 
              <small>{totalTasks}</small>
            </div>
          </div>
          <div className="col-xs-12 col-md-4">
          <div className="bg-white">
            <h4>Latest Created Tasks</h4>
            <ul>
            { 
              latestTasks.length != 0 && latestTasks.reverse().slice(0,3).map((task, index) => (
                
                  <li key={task.id} 
                  className = {task.is_completed == '1' ? 'done' : ''}
                  >
                    {task.title}
                  </li>
                  ))
              }
            </ul>
          </div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="bg-white">
              <div className="percent">
                <div className={pClass}>
              <span>{percent}%</span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className='col-md-10 mt-3'>
              <div className='card'>
                  <div className='card-body'>
                  <div className="func-block clearfix">
                    <label className="float-md-left mt-3">Task</label>
                    <div className="float-md-right">
                      <div>
                        <input
                                className="btn-search"
                                type="text"
                                placeholder="Search by task name"
                                value={searchTerm}
                                onChange={handleSearchTermInput}
                            />
                          <button className='btn btn-primary btn-sm mb-3 btn-newTask' type="button"
                              onClick={
                                  () => {
                                    props.showNewTaskModalCallBack(true);
                                    props.setUpdateTaskCallBack(false);
                                  }
                              }
                          >
                              + New Task
                          </button>
                        </div>
                      </div>
                      
                      </div>
                      <ul className=' list-group mt-3 clearfix'>
                          {props.tasks.length != 0 && props.tasks.map((task, index) => (
                              <li
                                  className='list-group-item d-flex align-items-left item clearfix'
                                  key={task.id}
                              >
                                  {
                                      task.is_completed == "1" ?
                                      <input
                                      className="checkbox"
                                      type="checkbox" defaultChecked disabled/> : 
                                      <input
                                      id={task.id}
                                      className="checkbox"
                                      type='checkbox'
                                      value={task.id}
                                      name={task.title}
                                      onClick= {
                                          handleMarkTaskAsCompleted(index)
                                      }
                                      /> 
                                  }
                                  <label 
                                  className= {task.is_completed == '1' ? 'text ml-3 done' : 'text ml-3'} 
                                  htmlFor={task.id}>{task.title}</label>
                                  <div className="control-block">
                                    <button 
                                      disabled={task.is_completed == "1" ? 'disabled' : ''}
                                        className='btn-edit'
                                        value={task.id}
                                        onClick={
                                            () => {
                                              props.handleAddNewTaskModal(true);
                                              props.setUpdateTaskCallBack(true);
                                              props.setUpdatedIdCallBack(task.id);
                                            }
                                        }
                                        >
                                        
                                    </button>

                                    <button 
                                        className='btn-delete'
                                        value={task.id}
                                        onClick={handleDeleteTask(index)}
                                    ></button>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
    </div>
  ) : null;
}
export default TaskList;