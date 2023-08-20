import { useState } from "react";

export default function App() {
  const [forms, setForm] = useState([]);

  function handleNewItem(task) {
    setForm((forms) => [...forms, task]);
  }
  function handleDeleteItem(index) {
    setForm((tasks) => tasks.filter((task, i) => i !== index));
  }

  return (
    <div className="app">
      <Header />
      <Form onAddTasks={handleNewItem} handleNewItems={handleNewItem} />
      <Tasks form={forms} onDeleteItems={handleDeleteItem} />
      {/* <TodoList /> */}
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>All Tasks</h1>
    </div>
  );
}

function Tasks({ form, onDeleteItems }) {
  return (
    <div className="tasks-container">
      <ul>
        {form.map((task, index) => (
          <TodoList
            key={index}
            onDeleteItems={() => onDeleteItems(index)}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
}

function Form({ onAddTasks }) {
  const [task, setTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() !== "") {
      onAddTasks(task);
      setTask(""); // Clear the input field after submitting
    }
  }

  return (
    <form className="task" onSubmit={handleSubmit}>
      <ul className="form">
        <input
          type="text"
          placeholder="What is the task"
          className="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <svg
          onClick={handleSubmit}
          className="add"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M4 12H20M12 4V20"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </ul>
    </form>
  );
}
function TodoList({ task, onDeleteItems }) {
  // console.log(task.key);

  const [taskData, setTaskData] = useState({
    checked: false,
    task: task,
  });

  function handleCheck() {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      checked: !prevTaskData.checked,
    }));
  }
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  function handleEditToggle() {
    setEditMode(!editMode);
    setEditedTask(taskData.task);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      task: editedTask,
    }));
    setEditMode(false);
  }
  return (
    <ul className="box">
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <input
            className="edit_input"
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          {/* <button type="submit">Save</button> */}
        </form>
      ) : (
        <div
          className={`task_submit ${taskData.checked ? "completed-text" : ""}`}
        >
          {taskData.task}
        </div>
      )}

      <div className="check_container">
        <svg
          onClick={handleCheck}
          className={`check ${taskData.checked ? "completed" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <rect
              // fill=""
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="#40c057"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>{" "}
            <path
              d="M7 13L10 16L17 9"
              stroke="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <span id="check">Check</span>
      </div>
      <div className="delete_container">
        <svg
          onClick={() => onDeleteItems(task.index)}
          className="delete"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M4 7H20"
              stroke="#f03e3e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
              stroke="#f03e3e"
              // fill="#f03e3e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="#f03e3e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <span id="delete">Delete</span>
      </div>
      <div className="edit_container">
        <svg
          onClick={handleEditToggle}
          className="edit"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
              stroke="#868e96"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
              stroke="#868e96"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
              stroke="#868e96"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <span id="edit">Edit</span>
      </div>
    </ul>
  );
}
