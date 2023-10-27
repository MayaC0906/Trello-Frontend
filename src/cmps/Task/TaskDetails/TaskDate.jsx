import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { appHeaderSvg } from "../../Svgs";
import dayjs from "dayjs";

export function TaskDate({ task, setEditName, editName, onSaveTask }) {
    const { dueDate } = task

    useEffect(() => {
        onSettingIsOverdue()
        onSettingIsDueSoon()
    }, [dueDate.date])

    async function onSettingIsOverdue() {
        console.log('1: task from overdue:', task);
        if (dueDate.isDueSoon) return
        let updatedOverdue
        const taskDueDate = dayjs(dueDate.date, 'MMM D YYYY [at] h:mm A').format('YYYY-MM-DD')
        const inputDate = new Date(`${taskDueDate}`);
        const currentDate = new Date();
        if (inputDate < currentDate) {
            updatedOverdue = true
            // newTask = { ...task, dueDate: { ...task.dueDate, isOverdue: true } }
        } else {
            updatedOverdue = false
            // newTask = { ...task, dueDate: { ...task.dueDate, isOverdue: false } }
        }
        // console.log('due:', updatedOverdue);
        const newTask = { ...task, dueDate: { ...task.dueDate, isOverdue: updatedOverdue } }

        console.log('from 1 newTask', newTask);
        try {
            await onSaveTask(newTask)
        } catch (err) {
            console.log(`Couldn't set isOverDue`, err);
        }
    }

    async function onSettingIsDueSoon() {
        console.log('2: duesoon task:', task);
        if (dueDate.isOverdue) return
        const myDate = dayjs(dueDate.date, 'MMM D YYYY [at] h:mm A')
        const tomorrow = dayjs().add(1, 'day').startOf('day')
        const isDateDueSoon = myDate.isSame(tomorrow, 'day')
        const newTask = { ...task, dueDate: { ...task.dueDate, isDueSoon: isDateDueSoon } }
        console.log('from 2 newTask', newTask);
        try {
            await onSaveTask(newTask)
        } catch (err) {
            console.log(`Couldn't set isOverDue`, err);
        }
    }

    function onCompleteDueDate() {
        const newTask = { ...task, dueDate: { ...task.dueDate, isComplete: !task.dueDate.isComplete } };
        onSaveTask(newTask)
    }

    function toggleDateDisplay() {
        if (editName === 'Dates') setEditName('')
        else if (editName === '') setEditName('Dates')
    }

    console.log('task:', task);

    return (

        dueDate.date && (
            <section className="task-display">
                <h2 className="task-date-title">Due date</h2>
                <section className="task-display flex align-center">
                    <div className='checkbox flex'>
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, p: 0, mr: 0.2 }} onClick={onCompleteDueDate} checked={dueDate.isComplete} />
                    </div>
                    <div className={`task-date flex align-center ${dueDate.isComplete ? 'complete-open' : ''}`} onClick={toggleDateDisplay}>
                        <span className="task-date-data">
                            {dayjs(dueDate.date, 'MMM D YYYY [at] h:mm A').format('MMM D [at] h:mm A')}
                        </span>
                        {dueDate.isComplete && (<span className="task-date-complete flex align-center">Complete</span>)}
                        {dueDate.isOverdue && !dueDate.isComplete && (<span className="task-date-complete overdue flex align-center">Overdue</span>)}
                        {dueDate.isDueSoon && !dueDate.isComplete && (<span className="task-date-complete due-soon flex align-center">Due soon</span>)}
                        {appHeaderSvg.arrowDown}
                    </div>
                </section>
            </section>
        )
    )
}