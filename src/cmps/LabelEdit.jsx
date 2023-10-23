import { useSelector } from 'react-redux'
import { additionTaskSvg, taskSvg } from './Svgs'
import { Checkbox } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { AddLabel } from './AddLabel'
import { useParams } from 'react-router'
import { Textarea } from '@mui/joy'

export function LabelEdit({ editName, onCloseEditTask, setTask, onSaveTask, task }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [labels, setLabels] = useState(board.labels)
    const [checkedLabelsStart, setCheckedLabelsStart] = useState([])
    const [isLabelEdit, setIsLabelEdit] = useState(false)
    const [labelToEdit, setLabelToEdit] = useState(null)

    const { boardId, groupId, taskId } = useParams()
    let isLabel = useRef(false)

    useEffect(() => {
        loadCheckedLabels()
        setLabels(board.labels)
    }, [board.labels])

    async function loadCheckedLabels() {
        // const task = await loadTask(boardId, groupId, taskId)
        setCheckedLabelsStart(task.labelIds)
    }

    function onAddLabel(label) {
        setIsLabelEdit(!isLabelEdit)
        setLabelToEdit(label)
    }



    async function onToggleLabelToTask(labelId) {
        let newTask
        isLabel = true
        try {
            const LabelIdx = task.labelIds.findIndex(id => id === labelId)
            if (LabelIdx === -1) {
                newTask = { ...task, labelIds: [...task.labelIds, labelId] }
            } else {
                const updatedLabels = [...task.labelIds]
                updatedLabels.splice(LabelIdx, 1)
                newTask = { ...task, labelIds: updatedLabels }
            }
            onSaveTask(newTask)
            setCheckedLabelsStart(newTask.labelIds)
            isLabel = false
        } catch (err) {
            console.log('Could not save date =>', err)
        }
    }

    function onLabelSearch({ target }) {
        const filteredLabels = board.labels.filter(label =>
            label.title.toLowerCase().includes(target.value.toLowerCase())
        )
        setLabels(filteredLabels)
    }

    return isLabelEdit ? (
        <AddLabel
            onCloseEditTask={onCloseEditTask}
            onAddLabel={onAddLabel}
            labelToEdit={labelToEdit}
            setTask={setTask}
            isLabel={isLabel}
            onSaveTask={onSaveTask}
            task={task}
        />) : (

        <section className="edit-modal">
            <div className="title-container">
                <p>{editName}</p>
                <button onClick={onCloseEditTask} className="close-modal">{additionTaskSvg.close}</button>
            </div>
            <section className="edit-modal-content">
                <Textarea placeholder="Search labels..." onChange={onLabelSearch} sx={{ fontSize: 14, fontWeight: 'medium', borderRadius: '3px', boxShadow: 'inset 0 0 0 1px #091e4224', bgcolor: 'white', color: 'black' }}></Textarea>
                <div className="content">
                    <p className='content-headline'>Labels</p>
                    <ul className='content-labels clean-list'>

                        {labels.map(label =>
                        (
                            <li className='label-edit flex'>
                                <section className='checkbox '>
                                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 10 }, padding: 0, width: 20, height: 20 }} onClick={() => onToggleLabelToTask(label.id)} checked={checkedLabelsStart.includes(label.id)} />
                                </section >
                                <button className='color clean-btn' onClick={() => onToggleLabelToTask(label.id)} style={{ backgroundColor: label.color }}>{label.title}</button>
                                <button className='pencil clean-btn flex' onClick={() => onAddLabel(label)}>{taskSvg.pencil}</button>
                            </li>
                        )
                        )}
                    </ul>
                    <button className='add-btn clean-btn' onClick={() => onAddLabel('')}>Create a new label</button>
                </div>
            </section>
        </section >
    )
}

