import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import listVariants from "../animation/ListVariants.js"; 
import buttonVariants from "../animation/ButtonVariants.js";

function Todo() {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        const storedTasks = [];
        for (let i = 0; i < localStorage.length; i++) {
            storedTasks.push(localStorage.getItem(i));
        }
        setList(storedTasks);
    }, []);

    function addTaskToList(){
        if (task.trim() !== "") {
            setList(l => {
                const updatedList = [...l, task];
                updatedList.forEach((element, index) => {
                    localStorage.setItem(index, element);
                });
                return updatedList; 
            });
            setTask("");
        }
    }

    function moveTaskUp(index){
        if (index === 0) return;

        setList(l => {
            const newList = [...l];
            [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];

            newList.forEach((element, index) => {
                localStorage.setItem(index, element);
            });

            return newList;
        });
    }

    function moveTaskDown(index){
        if (index === list.length - 1) return;
        
        setList(l => {
            const newList = [...l];
            [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];

            newList.forEach((element, index) => {
                localStorage.setItem(index, element);
            });

            return newList;
        });
    }

    function deleteTask(index){
        setList(l => {
            const newList = l.filter((_, i) => i !== index);
            newList.forEach((element, i) => {
                localStorage.setItem(i, element);
            });
            localStorage.removeItem(newList.length);
            return newList; 
        });
    }

    function handleKeyPress(event){
        if (event.key === "Enter") 
            addTaskToList();
    }


    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center flex-wrap mb-4">
                <input 
                    className="h-[38px] w-80 p-2 mx-2 mb-1 rounded-md bg-[#F1F8E8]" 
                    placeholder="enter task" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="h-[40px] w-80 border-[#B0C7A5] border-2 rounded-md bg-[#F1F8E8] hover:bg-[#B0C7A5] flex items-center justify-center mx-2 mb-1"
                    onClick={addTaskToList}
                >
                    add task
                </button>
            </div>

            <ol className="list-none">
                {list.map((eachTask, index) => (
                    <motion.li key={index} 
                               className="h-auto w-80 px-3 py-3 mb-1 border-[#B0C7A5] border-2 rounded-md bg-[#E0E5B6] flex items-center"
                               variants={listVariants} 
                               initial="initial"
                               animate="final">

                        <span className="flex-grow">{eachTask}</span>

                        <motion.button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => moveTaskUp(index)}
                            variants={buttonVariants}
                            initial="initial"
                            animate="final"
                        >
                            ⬆️
                        </motion.button>

                        <motion.button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => moveTaskDown(index)}
                            variants={buttonVariants}
                            initial="initial"
                            animate="final"
                        >
                            ⬇️
                        </motion.button>
                        
                        <motion.button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => deleteTask(index)}
                            variants={buttonVariants}
                            initial="initial"
                            animate="final"
                        >
                            ❌
                        </motion.button>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}

export default Todo;
