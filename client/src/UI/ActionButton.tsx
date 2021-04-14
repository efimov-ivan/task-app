import React, {useState, useEffect } from "react"
import Button from "@material-ui/core/Button"

type ActionButton = {
  icon?: React.ReactNode,
  fn: () => void,
  text: string,
  color?: "inherit" | "primary" | "secondary" | "default" | undefined,
  className?: string,
  style?: React.CSSProperties | undefined,
  size?: "small" | "medium" | "large" | undefined,
  variant?: "text" | "outlined" | "contained" | undefined,
  disabled?: boolean,
  disableButtons?: () => void,
  clearDisableButton?: () => void
}

const ActionButton: React.FC<ActionButton> = ({icon, fn, text, color, className, style, size = 'small', variant, disabled, disableButtons, clearDisableButton}) => {

  const [buttonText, setButtonText] = useState(text);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
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
      startIcon={icon}
      size={size ? size : "small"}
      color={color ? color: 'primary'}
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