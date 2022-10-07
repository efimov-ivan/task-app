import React, {useState, useEffect } from "react"
import {Button} from "@mui/material"
import {ActionButtonType} from '../store/types'

const ActionButton: React.FC<ActionButtonType> = ({icon, fn, text, color = 'primary', className, style, size = 'small', variant, disabled, disableButtons, clearDisableButton}) => {

  const [buttonText, setButtonText] = useState<string>(text);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    let i: number = 0;
    if (isActive) {
      if(disableButtons) {
        disableButtons()
      }
      interval = setInterval(() => {
        i++
        setButtonText(`cancel ${4 - i}`)
        if(i >= 4) {
          i = 0
          fn()
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
      setButtonText(text);
      if(clearDisableButton) {
        clearDisableButton()
      }
    }
    return () => {clearInterval(interval)};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Button 
      startIcon={icon}
      size={size ? size : "small"}
      color={color}
      variant={variant ? variant : 'outlined'}
      disabled={disabled}
      style={style ? style : {}}
      className={className ? className : ''}
      onClick={() => {setIsActive(!isActive);}}
      >
      {buttonText}
    </Button>
  )
}

export default ActionButton