import EditTask from "./edit_task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare as editIcon,
  faTrashCan as deleteIcon,
} from "@fortawesome/free-regular-svg-icons";
export default function Task({ task_obj, editTask, deleteTask, border_color }) {
  const { id, title, description } = task_obj;
  return (
    <div className="task" style={{ borderTop: `3px solid ${border_color}` }}>
      <div className="taskContent">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
      <button
        className="btn btn-sm btn-outline btn-tasks-func"
        onClick={() => deleteTask(id)}
        style={{ color: border_color, borderColor: border_color }}
      >
        <FontAwesomeIcon icon={deleteIcon} />
      </button>
      <EditTask
        key={id}
        task={task_obj}
        editTask={editTask}
        icon={<FontAwesomeIcon icon={editIcon} />}
        color={`${border_color}`}
      />
    </div>
  );
}
