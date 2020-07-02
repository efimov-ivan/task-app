import React from "react";
import clamp from "lodash-es/clamp";
import swap from "lodash-move";
import { useDrag } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import { fn } from "../Handlers/Handlers";

const Completed = ({ tasks }) => {
  let order = tasks.sort((a, b) => b.order - a.order).map((_, index) => index);
  const [springs, setSprings] = useSprings(tasks.length, fn(order));

  const bind = useDrag(({ args: [originalIndex], down, movement: [x, y] }) => {
    const curIndex = order.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      tasks.length - 1
    );
    const newOrder = swap(order, curIndex, curRow);
    // console.log(newOrder)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y, x));
    if (!down) order = newOrder;
  });

  return (
    <div className="tasks-list content">
      {springs.map(({ zIndex, shadow, y, x, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale
          }}
          children={tasks[i].title}
        />
      ))}
    </div>
  );
};

export default Completed;
