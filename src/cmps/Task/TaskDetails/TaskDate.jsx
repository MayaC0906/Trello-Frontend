import { Checkbox } from "@mui/material";
import { useEffect } from "react";
import { appHeaderSvg } from "../../Svgs";
import dayjs from "dayjs";

export function TaskDate({ task, setEditName, editName, onSaveTask }) {
    const { dueDate } = task

    useEffect(() => {
        onSettingIsOverdue()
    }, [dueDate.date])

    async function onSettingIsOverdue() {
        const taskDueDate = dayjs(dueDate.date, 'MMM D [at] h:mm A').format('YYYY-MM-DD')
        const inputDate = new Date(`${taskDueDate}`);
        const currentDate = new Date();
        if (inputDate < currentDate) {
            dueDate.isOverdue = true
        } else {
            dueDate.isOverdue = false
        }
        onSaveTask(task)
    }

    function onCompleteDueDate() {
        dueDate.isComplete = !dueDate.isComplete
        onSaveTask(task)
    }

    function toggleDateDisplay() {
        if (editName === 'Dates') setEditName('')
        else if (editName === '') setEditName('Dates')
    }

    return (

        dueDate.date && (
            <section className="task-display">
                <h2 className="task-date-title">Due date</h2>
                <section className="task-display flex align-center">

                    <div className='checkbox'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, p: 0, mr: 0.2 }} onClick={onCompleteDueDate} />
                    </div>
                    <div className={`task-date flex align-center ${dueDate.isComplete ? 'complete-open' : ''}`} onClick={toggleDateDisplay}>
                        <span className="task-date-data">{dueDate.date}</span>
                        {dueDate.isComplete && (<span className="task-date-complete flex align-center">Complete</span>)}
                        {dueDate.isOverdue && !dueDate.isComplete && (<span className="task-date-complete overdue flex align-center">Overdue</span>)}
                        {appHeaderSvg.arrowDown}
                    </div>
                </section>
            </section>
        )
    )
}