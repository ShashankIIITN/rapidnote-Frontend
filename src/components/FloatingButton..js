import React, { useContext } from 'react'
import '../css/App.css'
import NewContext from '../Context/NewContext';

function FloatingButton(props) {
  const context = useContext(NewContext);
  const SelectAll=async()=>{
    let elements = document.getElementsByClassName("CheckBox");
    let btn_element = document.getElementById("SelAll");
    
    if (!btn_element.classList.contains("btn_pressed")) {
      
      for (let index = 0; index < elements.length; index++) {
        elements[index].checked = true;
        await context.append(elements[index].value);
      }
      btn_element.classList.add("btn_pressed");
      props.showAlert("primary", "All Selected!");
    }else{
      for (let index = 0; index < elements.length; index++) {
        elements[index].checked = false;
        await context.deleteClear();
      }
      btn_element.classList.remove("btn_pressed");
      props.showAlert("primary", "All Deselected!");
    }
  }

  const DeleteAll = ()=>{
    context.MultiDelete();

    props.showAlert("success", "Successfull Deleted!");
  }
  return (
    <div className='btn-div'>
        <button type="button" className='c-btn' data-bs-toggle="modal" data-bs-target="#add"><i className="fa-light fa-plus" style={{fontSize: '25px'}}></i></button>
        <button type="button" className='c-btn' id ="SelAll" onClick={SelectAll}><i className="fa-solid fa-check"></i></button>
        <button type="button" className='c-btn' onClick={DeleteAll}><i className="fa-sharp fa-solid fa-trash"></i></button>
    </div>
  )
}

export default FloatingButton