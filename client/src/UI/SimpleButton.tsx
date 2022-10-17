import React, {useState, useEffect } from "react"
import {Button} from "@mui/material"
import {ActionButtonType} from '../store/types'

const SimpleButton: React.FC<ActionButtonType> = ({icon, fn, text, color = 'primary', className, style, size = 'small', variant, disabled, disableButtons, clearDisableButton}) => {

  // const [buttonText, setButtonText] = useState<string>(text);
  // const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <Button 
      startIcon={icon}
      size={size ? size : "small"}
      color={color}
      variant={variant ? variant : 'outlined'}
      disabled={disabled}
      style={style ? style : {}}
      className={className ? className : ''}
      onClick={() => fn()}
      >
      {text}
    </Button>
  )
}

export default SimpleButton