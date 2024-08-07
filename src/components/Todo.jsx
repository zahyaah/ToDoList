import { useState, useEffect } from "react";

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
                    className="h-[32px] min-w-72 p-2 mx-2 mb-1 rounded-md bg-[#F1F8E8]" 
                    placeholder="enter task" 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="h-[32px] min-w-72 px-2 border-[#B0C7A5] border-2 rounded-md bg-[#F1F8E8] hover:bg-[#B0C7A5]"
                    onClick={addTaskToList}
                >
                    add task
                </button>
            </div>

            <ol className="list-none">
                {list.map((eachTask, index) => (
                    <li key={index} className="h-auto w-72 px-3 mb-1 border-[#B0C7A5] border-2 rounded-md bg-[#E0E5B6] flex items-center">
                        <span className="flex-grow">{eachTask}</span>
                        <button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => moveTaskUp(index)}
                        >
                            ⬆️
                        </button>
                        <button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => moveTaskDown(index)}
                        >
                            ⬇️
                        </button>
                        <button 
                            className="mx-1 px-2 text-white rounded"
                            onClick={() => deleteTask(index)}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Todo;
