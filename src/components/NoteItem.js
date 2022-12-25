import React, { useContext } from 'react'
import NewContext from '../Context/NewContext'

function NoteItem(props) {
    const context = useContext(NewContext);

    const setSelectedNote = () => {
        context.setSelectedNote(props.Notes);
    }
    const DeleteNote = () => {
        context.DeleteNote(props.Notes._id);

        props.showAlert("success", "Note deleted successfully");
    }
    const Select = (e) => {
        if (e.target.checked) {
            context.append(props.Notes._id);
        }else context.delete(props.Notes._id);

    }
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                {props.select && <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill">
                    <input className="CheckBox" type="checkbox" value={props.Notes._id} onChange={Select} id="flexCheckDefault" />
                </span>}
                <h5 className="card-title">{props.Notes.title}</h5>
                <div className="mydiv">
                    <span className="badge rounded-pill bg-dark">
                        {props.Notes.tag}
                    </span>

                    <span className="badge rounded-pill bg-dark" >
                        <i className="fa fa-duotone fa-pen-to-square me-2" data-bs-toggle="modal" data-bs-target="#edit" onClick={setSelectedNote}></i>
                        <i className="fa-sharp fa-solid fa-trash ms-2" onClick={DeleteNote}></i>
                    </span>
                </div>
                <p className="card-text">{props.Notes.description}</p>
            </div>
        </div>
    )
}

export default NoteItem