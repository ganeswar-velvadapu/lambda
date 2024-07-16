import React, { useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'



const Sidebar = () => {


    const [extended,setExtended] = useState(false)

    const openMenu = ()=>{
        setExtended(!extended)
    }
  return (
    <div className='sidebar'>
      <div className="top">
         <img className='menu' src={assets.menu_icon} onClick={openMenu}/>
         <div className="newchat">
            <img src={assets.plus_icon} />
           {extended ? <p>New Chat</p> : null} 
         </div>
         {extended ?
         <div className="recent">
            <p className='recent-title'>Recent</p>
            <div className="recent-entry">
                <img src={assets.message_icon}/>
                <p>What is react ...</p>
            </div>
         </div> :null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> :null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> :null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> :null} 
        </div>
      </div>
    </div>
  )
}

export default Sidebar
