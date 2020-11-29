import React, { useEffect, useState, useCallback } from 'react';
import  NoTaskModal from './NoTaskModal';
import  NewTaskModal from './NewTaskModal';
import  Header from './Header';
import LogIn from './LogIn';
import TaskList from './TaskList';

const NewDashBoard = (props) => {
    const [tasks, updateTaskLists] = useState([]);
    const [staticList, setStaticList] = useState([]);
    const [showNoTaskModal, setNoTaskModal] = useState(false);
    const [showNewTaskModal, setNewTaskModal] = useState(false);
    const [isUpdateTask, setUpdateTask] = useState(false);
    const [updatedId, setUpdatedId] = useState(-1);
    const [user, setUser] = useState({});
    const [logInForm, setLogInForm] = useState(true);
    const [header, setHeader] = useState(false);
    const [showTaskList, setShowTaskList] = useState(false);
    
    
    useEffect(() => {
        isLoggedIn();
        fetchTasks();
    }, [isLoggedIn, updateTaskLists, setLogInForm, setUserCallBack, setStaticList]);

    const isLoggedIn = useCallback(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            console.log('logged in');
            setLogInForm(false);
            setUser(user);
            setHeader(true);
            fetchTasks();
        } else {
            console.log('not logged in');
            setLogInForm(true);
            setHeader(false);
            setShowTaskList(false);
        }
    });

    const fetchTasks = useCallback(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            const userId = user.id;
            axios.get(`/api/tasks/${userId}`)
                .then(response => {
                    updateTaskLists(response.data);
                    setStaticList(response.data);
                    
                    handleNoTaskModal(response.data); 
                    setShowTaskList(true);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    });

    function handleNoTaskModal(data) {
        if (data.length == 0) {
            setNoTaskModal(true);
            
        } else {
            setNoTaskModal(false);
            setUpdateTask(false);
        }
    }
    
    const handleAddNewTaskModal = (isShow) => {
        setNewTaskModal(isShow);
    }

    const setTaskLists = (newTask) => {
        updateTaskLists([...tasks, newTask]);
    }

    const setUpdateTaskCallBack = (show) => {
        setUpdateTask(show);
    }

    const updateTaskList = (newTaskList) => {
        updateTaskLists(newTaskList);
    }
    const updateTaskListCallBack = (newTaskList) => {
        updateTaskLists(newTaskList);
    }

    const setStaticListCallBack = (newTaskList) => {
        setStaticList(newTaskList);
    }

    const updateStaticListCallBack = (newTask) => {
        setStaticList([...staticList, newTask]);
    }

    const updateStaticListOriginCallBack = () => {
        setStaticList(tasks);
    }

    const showNewTaskModalCallBack = (isShow) => {
        setNewTaskModal(isShow);
    }
    const handleNoTaskModalCallBack = (data) => {
        handleNoTaskModal(data);
    }
    const setUserCallBack = (newUser) => {
        setUser(newUser);
        fetchTasks();
    }
    const setUpdatedIdCallBack = (id) => {
        setUpdatedId(id);
    }

    const setShowTaskListCallBack = (show) => {
        setShowTaskList(show);
    }

    const logOut = () => {
        sessionStorage.removeItem("user");
        setUser({});
        updateTaskList([]);
        setLogInForm(true);
        setHeader(false);
        console.log('logged out');
    }

    return (
        <div className='container-fluid m-0 p-0'>
            <Header 
                doLogOut={logOut}
                user={user}
                isShowing={header}
                setShowTaskListCallBack={setShowTaskListCallBack}
            />

            <LogIn
                isShowing={logInForm}
                setLogin={setLogInForm}
                setUser={setUser}
                setHeader={setHeader}
                setUserCallBack={setUserCallBack}
            />
            
            <NoTaskModal
                isShowing={showNoTaskModal}
                hide={handleNoTaskModalCallBack}
                showNewTask={showNewTaskModalCallBack}
            />

            <NewTaskModal
                isShowing={showNewTaskModal}
                tasks = {tasks}
                addTaskList = {setTaskLists}
                updateList = {updateTaskList}
                hideModal= {handleAddNewTaskModal}
                isUpdate={isUpdateTask}
                updatedId = {updatedId}
                user={user}
                updateStaticListCallBack={updateStaticListCallBack}
                updateStaticListOriginCallBack={updateStaticListOriginCallBack}
            />

            <TaskList
                isShowing={showTaskList}
                tasks={tasks}
                showNewTaskModalCallBack={showNewTaskModalCallBack}
                setUpdateTaskCallBack={setUpdateTaskCallBack}
                staticList={staticList}
                updateTaskListCallBack={updateTaskListCallBack}
                handleNoTaskModalCallBack={handleNoTaskModalCallBack}
                handleAddNewTaskModal={handleAddNewTaskModal}
                setUpdatedIdCallBack={setUpdatedIdCallBack}
                // completedTasks={completedTasks}
                // getCompletedTasks={getCompletedTasks}
                setStaticListCallBack={setStaticListCallBack}
                updateStaticListOriginCallBack={updateStaticListOriginCallBack}
            />
        </div>
    )
    
}
export default NewDashBoard;
