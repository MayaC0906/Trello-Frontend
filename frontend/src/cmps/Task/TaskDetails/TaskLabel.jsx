import { useEffect, useState } from "react";
import { taskSvg } from "../../Svgs";
import { useSelector } from "react-redux";


export function TaskLabel({ taskLabelsId, setEditName, editName, setEv }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [labels, setLabels] = useState([])

    useEffect(() => {
        onLoadLabels(taskLabelsId)
    }, [taskLabelsId])

    async function onLoadLabels(taskLabelsId) {
        const taskLabels = board.labels.filter(label => taskLabelsId.includes(label.id))
        setLabels(taskLabels)
    }

    function toggleLabelDisplay() {
        if (editName === 'Label') setEditName('')
        else if (editName === '') setEditName('Label')
    }

    return (
        labels.length > 0 &&
        (<section className="labels">
            <p className="members-headline">Labels</p>
            <div className="labels-detail flex align-center">
                {labels.map(label => (
                    <button className="labels-display" style={{ backgroundColor: label.color }} onClick={toggleLabelDisplay}>{label.title}</button>
                ))}
                <button className="labels-add clean-btn flex align-center" onClick={(event) => {
                    setEv(event)
                    toggleLabelDisplay()
                }}>{taskSvg.add}</button>
            </div>
        </section>)
    )
}