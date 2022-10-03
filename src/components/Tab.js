import { v4 as uuidv4 } from 'uuid';

import TaskItem from "./TaskItem";

function Tab(props) {
    //props.tabDataItem
    //props.user
    //props.setUserData
    //props.db

    // console.log(props.user.tasks);
    // let taskDate = props.user.tasks[0].date;
    // let newDate = new Date(taskDate);
    var q = new Date();
    var todayDate = new Date(q.getFullYear(),q.getMonth(),q.getDate());
    // console.log(date-newDate);

    let tasksAll;
    let tabTitle;
    switch (props.tabDataItem.filterType) {
        case "all":
            tabTitle= "All Tasks";
            if (props.user.tasks.length > 0) {
                tasksAll = props.user.tasks.map((task) =>
                <TaskItem key={uuidv4()} taskId={task.id} title={task.title} date={task.date} desc={task.desc} status={task.status} proj={task.proj} user={props.user} setUserData={props.setUserData} db={props.db}/>
                );
            } else {
                tasksAll = <p >No tasks available.</p>
            };
            break;
        case "today":
            tabTitle= "Due Today";
            let todayTasks = props.user.tasks.filter(task => 86400000 > ((new Date(task.date)) - todayDate) && ((new Date(task.date)) - todayDate)  > 0);
            if (todayTasks.length > 0) {
                tasksAll = todayTasks.map((task) =>
                <TaskItem key={uuidv4()} taskId={task.id} title={task.title} date={task.date} desc={task.desc} status={task.status} proj={task.proj} user={props.user} setUserData={props.setUserData} db={props.db}/>
                );
            } else {
                tasksAll = <p >No tasks available.</p>
            };
            break;
        case "week":
            tabTitle= "Due This Today";
            let weekTasks = props.user.tasks.filter(task => 86400000*7 > ((new Date(task.date)) - todayDate) && ((new Date(task.date)) - todayDate)  > 0);
            if (weekTasks.length > 0) {
                tasksAll = weekTasks.map((task) =>
                <TaskItem key={uuidv4()} taskId={task.id} title={task.title} date={task.date} desc={task.desc} status={task.status} proj={task.proj} user={props.user} setUserData={props.setUserData} db={props.db}/>
                );
            } else {
                tasksAll = <p >No tasks available.</p>
            };
            break;
        case "proj":
            let selectedProj = props.user.projects.filter((proj) => proj.id === props.tabDataItem.filterValue);
            console.log(selectedProj);
            tabTitle= selectedProj[0].title;
            let projTasks = props.user.tasks.filter(task => task.proj === props.tabDataItem.filterValue);
            if (projTasks.length >0) {
                tasksAll = projTasks.map((task) =>
                <TaskItem key={uuidv4()} taskId={task.id} title={task.title} date={task.date} desc={task.desc} status={task.status} proj={task.proj} user={props.user} setUserData={props.setUserData} db={props.db}/>
                );
            } else {
                tasksAll = <p className="no-tasks">No tasks assigned to this project.</p>
            };
            break;
        default:
    }

    return (
        <div className={"proj-tab"}>
            <p className={"proj-title"}>{tabTitle}</p>
            {tasksAll}
        </div>
    );
}


export default Tab;