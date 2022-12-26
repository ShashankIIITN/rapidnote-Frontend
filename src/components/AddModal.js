import React, { useContext, useState, useRef, useEffect } from "react"
import NewContext from "../Context/NewContext"

function AddModal(props) {
    const context = useContext(NewContext);
    const [Note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...Note, [e.target.name]: e.target.value });
    }
    const onClickAdd = async () => {
        const res = await context.CreateNote(Note.title, Note.description, Note.tag.trim() === "" ? "General" : Note.tag.trim());
        if (res) {
            refcloseadd.current.click();
            props.showAlert("success", " Successfully Created a New Note!");
            
        }else{
            
            refcloseadd.current.click();
            props.showAlert("danger", " Failed to Create a Note!");
        }

    }
    const ref = useRef(null);
    const refcloseadd = useRef(null);
    return (
        <>
            <button type="button" ref={ref} id="lol" hidden={true} className="btn  btn-primary" data-bs-toggle="modal" data-bs-target={'#' + props.modal.id}>
            </button>
            <div className="modal fade" id={props.modal.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className=" modal-dialog" >
                    <div className=" modal-style modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.modal.type}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="AddNote" className="form-label">Title:</label>
                            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" defaultValue={Note.title} onChange={onChange} />
                            <label htmlFor="AddNote" className="form-label">Description:</label>
                            <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name="description" onChange={onChange} />
                            <label htmlFor="AddNote" className="form-label">Tag:</label>
                            <input type="text" className="form-control" id="tag" aria-describedby="emailHelp" name="tag" onChange={onChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refcloseadd} className="btn btn-secondary" data-bs-dismiss="modal" id="modalclose">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onClickAdd}>{props.modal.btntype}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModal