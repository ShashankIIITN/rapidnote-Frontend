import React, { useState } from 'react'
import NewContext from './NewContext'

const DataContext = (props) => {
    /*const Notes =
    [
        {
            "_id": "639deb029f2a1c14cb63455d",
            "user": "639db828cdd35626ef0b441f",
            "title": "My First Note",
            "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
            "tag": "Checker",
            "date": "2022-12-17T16:14:58.071Z",
            "__v": 0
        },
            {
                "_id": "639deb2a9f2a1c14cb63455f",
                "user": "639db828cdd35626ef0b441f",
                "title": "My Second Note",
                "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-17T16:15:38.885Z",
                "__v": 0
            },
            {
                "_id": "639e15ace12646850315fb61",
                "user": "639db828cdd35626ef0b441f",
                "title": "My third Note",
                "description": "Hello this is my first note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-17T19:17:00.341Z",
                "__v": 0
            },
            {
                "_id": "63a051acff141aaca8526c11",
                "user": "639db828cdd35626ef0b441f",
                "title": "My fourth Note",
                "description": "Hello this is my fourth note, just checking that everything works fine and there is any error or not",
                "tag": "Checker",
                "date": "2022-12-19T11:57:32.334Z",
                "__v": 0
            }
        ]*/
    const Host = process.env.REACT_APP_HOST || "http://localhost:4000";
    const [Notes, setNotes] = useState(null);
    const [SelectedNote, setSelectedNote] = useState(null);
    const [SelectedList, setSelectedList] = useState([]);
    const [progress, setProgress] =  useState(0);

    const FetchAllNotes = async () => {
        setProgress(30);
        const url = `${Host}/api/notes/get-allnote`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("Token")
            }
        })
        setProgress(70);
        const notesdata = await response.json();
        setProgress(90);
        setNotes(notesdata);
        setProgress(100);
    }
    const CreateNote = async (title, description, tag) => {
        let sts = false;
        const url = `${Host}/api/notes/create-note`
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ title, description, tag })
            })
            const resjson = await response.json();
            let newnote = Notes.concat(resjson);
            if (response.ok) {

                setNotes(newnote);
            }
            sts = response.ok;
        } catch (error) {
            console.log(error);
        }
        return sts;
    }
    const UpdateNote = async (title, description, tag, note_id) => {
        let sts = false;
        const url = `${Host}/api/notes/update-note/${note_id}`

        try {

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
                body: JSON.stringify({ title, description, tag })
            })
            let resjson = await response.json();
            await FetchAllNotes();
            sts = {resjson, success:response.ok};
        } catch (error) {
            console.log(error);
        }
        return sts.success;
    }
    const DeleteNote = async (note_id) => {
        let sts = false;
        const url = `${Host}/api/notes/delete-note/${note_id}`

        try {

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("Token")
                },
            })
            let resjson = await response.json();
            if (response.ok) {
                let newnote = Notes.filter((Notes) => { return Notes._id !== note_id })
                setNotes(newnote);
            }
            
            sts = {resjson, success:response.ok};
        } catch (error) {
            console.log(error);
        }
        return sts.success;
    }
    const MultiDelete = async () => {
        setProgress(30);
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            await DeleteNote(element);
        }
        setProgress(60);
        setSelectedList([]);
        setProgress(80);
        await FetchAllNotes();
        setProgress(100);
    }
    const addSelected = (id) => {
        let ap = true;
        let list = SelectedList;
        for (let index = 0; index < SelectedList.length; index++) {
            const element = SelectedList[index];
            if (element === id) {
                ap = false;

            }

        }
        if (ap) {

            list.push(id);
        }
        setSelectedList(list);
    }
    const deleteSelected = (id) => {
        let list = [];
        SelectedList.forEach(element => {
            if (element !== id) {
                list.push(element);
            }
        });
        setSelectedList(list);
    }
    const deleteClear = () => {
        let list = [];
        setSelectedList(list);
    }

    const SignUp = async (name, email, password)=>{
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/create-user/`
        try {
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = {resjson, success:response.ok};
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    const Login = async (email, password)=>{
        setProgress(30);
        let sts = false;
        const url = `${Host}/api/auth/login-user/`
        try {
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password })
            })
            setProgress(60);
            const resjson = await response.json();
            setProgress(80);
            sts = {resjson, success:response.ok};
        } catch (error) {
            console.log(error);
        }
        setProgress(100);
        return sts;
    }
    return (
        <NewContext.Provider value={{ Notes: Notes, FetchNotes: FetchAllNotes, CreateNote: CreateNote, UpdateNote: UpdateNote, setSelectedNote: setSelectedNote, SelectedNote: SelectedNote, DeleteNote: DeleteNote, append: addSelected, delete: deleteSelected, MultiDelete: MultiDelete, deleteClear: deleteClear, SignUp : SignUp, Login:Login, progress:progress, setProgress:setProgress }}>
            {props.children}
        </NewContext.Provider>
    )
}

export default DataContext;