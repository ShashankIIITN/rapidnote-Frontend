import React from 'react'

function Alert(props) {
    return (
        props.Alert.show && <div className={`alert  alert-${props.Alert.status}`} role="alert" style={{height:'30px', paddingTop:'0px'}}>
            {props.Alert.msg}
        </div>
    )
}

export default Alert