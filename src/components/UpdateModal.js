import React, { useContext, useState, useRef, useEffect } from "react"
import NewContext from "../Context/NewContext"

function UpdateModal(props) {
    const context = useContext(NewContext);
    const [Note, setNote] = useState({title:"", description:"", tag:""});

    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value });
    }
    const onClickUpdate = async () => {
        const res = await context.UpdateNote(Note.title, Note.description, Note.tag.trim() === "" ? "General" : Note.tag.trim(), context.SelectedNote._id);

        if (res) {
            refcloseup.current.click();
            props.showAlert("success", "Successfully Updated !");
        }else{
            
            refcloseup.current.click();
            props.showAlert("danger", "Update Failed !");
        }
    }
    const refup = useRef(null);
    const refcloseup = useRef(null);
    return (
        <>
            <button type="button" ref={refup} id="lol" hidden={true} className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#' + props.modal.id}>
                Launch demo modal
            </button>
            <div className="modal fade" id={props.modal.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className=" modal-style modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.modal.type}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="UpdateNote" className="form-label">Title:</label>
                            <input type="text" className="form-control" id="uptitle" aria-describedby="emailHelp" name="title" defaultValue={!context.SelectedNote?"":context.SelectedNote.title} onChange={onChange} />
                            <label htmlFor="UpdateNote" className="form-label">Description:</label>
                            <input type="text" className="form-control" id="updescription" aria-describedby="emailHelp" name="description" defaultValue={!context.SelectedNote?"":context.SelectedNote.description} onChange={onChange} />
                            <label htmlFor="UpdateNote" className="form-label">Tag:</label>
                            <input type="text" className="form-control" id="uptag" aria-describedby="emailHelp" name="tag" defaultValue={!context.SelectedNote?"":context.SelectedNote.tag} onChange={onChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refcloseup} className="btn btn-secondary" data-bs-dismiss="modal" id="modalclose">Close</button>
                            <button type="button" className="btn btn-primary" onClick={ onClickUpdate}>{props.modal.btntype}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateModal