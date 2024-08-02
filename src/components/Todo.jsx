import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Todo() {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);
    const [listIndex, setListIndex] = useState(undefined);

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    }

    const clearFields = () => {
        if (task === "" || task === undefined)
            return;
        setList((l) => [...l, task]);
        setTask("");
    }

    const handleDeleteTask = (index) => {
        setList((l) => l.filter(element => l.indexOf(element) !== index))
    }

    const listVariants = {
        initial: {
            y: "-100vh"
        }, 
        final: {
            y: 0,
            transition: {
                delay: 0.5, 
                duration: 0.5
            }
        }
    }

    const buttonVariants = {
        initial: {
            opacity: 0
        }, 
        final: {
            opacity: 1,
            transition: {
                duration: 3
            }
        }
    }

    useEffect(() => {
        if (listIndex !== undefined) {
            setList((l) => l.filter((_, index) => index !== listIndex))
        }
    }, [listIndex]);


    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <input type="text" onChange={(e)=> handleTaskChange(e)} placeholder="Enter Task" value={task} className="border-[#5F6F65] border-2 p-3 h-15 w-80 m-3" />
                <button type="submit" onClick={clearFields} className="h-12 w-80 border-[#5F6F65] border-2 text-center hover:bg-[#808D7C] hover:text-white">Submit</button>
                <ul className="list-none">
                    { list.length !== 0 && 
                        list.map((item, index) => {
                            return (
                                <div key={index} className="flex justify-center items-center">
                                        <motion.li key={index}
                                            variants={listVariants}
                                            initial="initial"
                                            animate="final"
                                            className="border-[2px] border-greenish p-3 m-4 bg-[#808D7C] rounded-md w-80 h-auto"
                                            > { item } 
                                        </motion.li>
                                        <motion.button className="bg-rose-600 hover:bg-rose-700 h-[45px] text-white font-bold px-3 py-1 my-4  mx-1 rounded" 
                                            variants={buttonVariants} 
                                            initial="initial" 
                                            animate="final"
                                            id="complete"
                                            onClick={() => handleDeleteTask(index)}
                                            >
                                                Completed
                                        </motion.button>
                                        <motion.button className="bg-blue-500 hover:bg-blue-700 h-[45px] text-white font-bold px-3 py-1 my-4 mx-1 rounded"
                                            variants={buttonVariants} 
                                            initial="initial" 
                                            animate="final"
                                            id="up"
                                            >
                                            ⬆️
                                        </motion.button>
                                        <motion.button className="bg-blue-500 hover:bg-blue-700 h-[45px] text-white font-bold px-3 py-1 my-4 mx-1 rounded"
                                            variants={buttonVariants} 
                                            initial="initial" 
                                            animate="final"
                                            id="down"
                                            >
                                            ⬇️
                                        </motion.button>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Todo; 