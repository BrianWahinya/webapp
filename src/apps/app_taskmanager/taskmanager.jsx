import { useEffect, useState } from "react";
import { Breadcrumbs } from "../../components";
import Task from "./task";
import CreateTask from "./create_task";
import "./taskmanager.css";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks) {
      setTasks([...JSON.parse(localTasks)]);
    }
  };

  const addTask = (task_obj) => {
    const taskList = [...tasks];
    taskList.push(task_obj);
    setTasks(taskList);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };

  const editTask = ({ id, title, description, color }) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title, description, color };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const tasksUndeleted = tasks.filter((task) => task.id !== id);
    setTasks(tasksUndeleted);
    localStorage.setItem("tasks", JSON.stringify(tasksUndeleted));
  };

  const deleteAllTasks = () => {
    setTasks([]);
    localStorage.setItem("tasks", JSON.stringify([]));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Breadcrumbs crumbs={["home", "app", "taskmanager"]} />
      <div>
        <h4>Task Manager App</h4>
      </div>
      <CreateTask addTask={addTask} />
      <button
        className="btn btn-outline-danger btn-sm btn-tasks"
        onClick={deleteAllTasks}
      >
        Delete All Tasks
      </button>
      <div className="tasksDiv">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task_obj={task}
            editTask={editTask}
            deleteTask={deleteTask}
            border_color={task.color}
          />
        ))}
      </div>
    </>
  );
}
