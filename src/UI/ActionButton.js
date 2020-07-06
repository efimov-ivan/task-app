import React, {useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const ActionButton = ({icon, fn, text, color, className, style, size, variant, disabled, disableButtons, clearDisableButton}) => {

  const [buttonText, setButtonText] = useState(text);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    let i = 0
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
    } else if (!isActive) {
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
      size={size ? size : 'small'}
      color={color}
      style={style ? style : null}
      className={className ? className : null}
      variant={variant ? variant : 'outlined'}
      startIcon={icon}
      onClick={() => {setIsActive(!isActive);}}
      disabled={disabled}
      >
      {buttonText}
    </Button>
  )
}

export default ActionButton