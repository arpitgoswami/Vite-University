import { useRef, useEffect, useState } from "react";
import TaskCard from "../components/cards/TaskCard";
import axios from "@axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("tasks");
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="relative w-[100wh] h-screen flex justify-center items-center"
      >
        <div className="text-9xl font-bold">Tasks.</div>
        <div className="absolute w-screen h-screen p-4 flex space-x-2">
          {tasks.map((task, index) => (
            <TaskCard key={index} data={task} ref={ref} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Tasks;
