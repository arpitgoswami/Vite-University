import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const TaskCard = forwardRef(({ data }, ref) => {
  return (
    <motion.div
      dragConstraints={ref}
      whileDrag={{ scale: 1.1 }}
      drag
      className="hover:cursor-move w-84 relative space-y-4 rounded-2xl p-4 pb-12 bg-zinc-800 text-white text-xs h-max"
    >
      <div>{data.TITLE}</div>
      <div>{data.DESCRIPTION}</div>
      <div> {data["DEADLINE DATE"].slice(0, 10)}</div>
      <div
        className={`absolute rounded-b-2xl bottom-0 px-4 py-2 w-full left-0 overflow-auto ${
          data.STATUS === "Completed"
            ? "bg-green-500"
            : data.STATUS === "In Progress"
            ? "bg-yellow-500"
            : data.STATUS === "Deadline Crossed"
            ? "bg-red-500"
            : "bg-gray-500"
        }`}
      >
        {data.STATUS}
      </div>
    </motion.div>
  );
});

export default TaskCard;
