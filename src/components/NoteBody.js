import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NewContext from '../Context/NewContext'
import NoteItem from './NoteItem';
import FloatingButton from './FloatingButton.';


function NoteBody(props) {
    const Navigate = useNavigate();
    const Contexts = useContext(NewContext);

    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            Navigate("/Login");
        }else{
            Contexts.FetchNotes();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>{
            Contexts.Notes && <div className=" All-Notes d-flex justify-content-center " style={{ gap: '25px', flexWrap: 'wrap', paddingTop: '20px',maxHeight:'85vh', overflowY:'auto' }}>
                {Contexts.Notes.map((element) => {
                    return (

                        <NoteItem key={element._id} Notes={element} showAlert={props.showAlert} select={true} />
                    )
                })
                }
            </div>}

            <FloatingButton showAlert={props.showAlert}/>
        </>
    )
}

export default NoteBody