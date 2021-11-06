import { useState } from "react"

const AddTask = ({ addTask }) => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    // process form
    const processForm = (e) => {
        e.preventDefault()

        if (!text || !date) {
            alert('Task and Task Date are Required')

            return
        }

        addTask({ text, date, reminder})

        setText('')
        setDate('')
        setReminder(false)
    }
    return (
        <form className="add-form" onSubmit={processForm}>
            <div className="form-control">
                <label>Task</label>
                <input value={text} onChange={ (e) => setText(e.target.value) } type="text" placeholder="Add Task" />
            </div>
            <div className="form-control">
                <label>Date</label>
                <input value={date} onChange={ (e) => setDate(e.target.value) } type="text" placeholder="Add Date" />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input checked={reminder} value={reminder} onChange={ (e) => setReminder(e.currentTarget.checked) } type="checkbox" />
            </div>

            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    )
}

export default AddTask
