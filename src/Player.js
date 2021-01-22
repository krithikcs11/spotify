import React from 'react'
import './player.css';
import SideBar from './SideBar'
import Body from './Body'
import Footer from './Footer'
const Player = ({spotify}) => {
    return (
        <div className='player' >
            <div className='player_body' >
               <SideBar />
               <Body spotify={spotify} />
            </div>
            <Footer spotify={spotify}  />
        </div>
    )
}

export default Player
