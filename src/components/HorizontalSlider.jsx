import { Box } from '@mui/material';
import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';


const HorizontalSlider =({items})=>{
 
  return (
    <ScrollMenu >
      {items.map(( image, idx ) => {
        return <div
          key={`${idx}`}
          style={{
            width: '320px',
          }}
          tabIndex={3}
        >
            <Box component={"img"} src={image} width={"300px"} height={"520px"}/>
        </div>
      })}
    </ScrollMenu>
  );
}

export default HorizontalSlider;