import React from 'react'

const day = ({noteKey, date, dayOnClick, className}) =>{
    return(
        <div 
        className = {className} 
        onClick = {() => dayOnClick(noteKey)}
        >{date}</div>
    )
}

export default day