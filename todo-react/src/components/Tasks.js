import Task from "./Task.js"
const Tasks = ({ tasks, ondelete, onreminder }) => {
    return (
        <div>
            {
                tasks.map((task) =>
                    (<Task key={task.id} task={task} onreminder={onreminder} ondelete={ondelete} />)
                )
            }
        </div>
    )
}

export default Tasks
