import React from 'react';
import {LeftComponent} from './LeftComponent';
import{ RightComponent }from './RightComponent';

const  StickyNote =()=>{



    return(
    <div className= "pageBackground">
        
         <LeftComponent></LeftComponent>
           
           <RightComponent></RightComponent>
    </div>);

}


export default StickyNote;