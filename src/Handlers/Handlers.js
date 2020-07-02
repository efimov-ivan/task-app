import React, {useState, useEffect } from "react";
import { divide } from "lodash-es";


const Handlers = fn => {
  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(isActive){
      setIsActive(false)
      setSeconds(0)
    } else {
      setIsActive(true)
    }
  }, [])

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        console.log(seconds)
        if(seconds >= 4) {
          fn()
          setSeconds(0);
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {clearInterval(interval)};
  }, [isActive, seconds]);

}

export default Handlers