import EditTask from "./edit_task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare as editIcon,
  faTrashCan as deleteIcon,
} from "@fortawesome/free-regular-svg-icons";
export default function Task({ task_obj, editTask, deleteTask, border_color }) {
  const { id, title, description } = task_obj;
  return (
    <div className="task" style={{ borderTop: `5px solid ${border_color}` }}>
      <h5>{title}</h5>
      <p>{description}</p>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => deleteTask(id)}
      >
        <FontAwesomeIcon icon={deleteIcon} />
      </button>
      <EditTask
        key={id}
        task={task_obj}
        editTask={editTask}
        icon={<FontAwesomeIcon icon={editIcon} />}
      />
    </div>
  );
}
