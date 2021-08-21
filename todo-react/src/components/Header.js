import Button from "./Button"
const Header = ({ title, onAdd, showAddTask }) => {

    return (
        <div className="header">
            <h1>{title}</h1>
            <Button color={showAddTask ? "red" : "green"} text={showAddTask ? "close" : "Add"} onClick={onAdd} />
        </div>
    )
}

export default Header
