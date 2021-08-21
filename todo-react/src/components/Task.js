import React from 'react'
import { FaTimes } from 'react-icons/fa'

const task = ({ task, ondelete, onreminder }) => {


    return (
        <>
            <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onreminder(task.id)} >
                <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => ondelete(task.id)} /></h3>
                <p>{task.date}</p>
            </div>
        </>
    )
}

export default task
