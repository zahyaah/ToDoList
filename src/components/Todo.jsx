import { useState } from "react";

function Todo() {
    const [task, setTask] = useState("");
    const [list, setList] = useState([]);

    function addTaskToList(){
        if (task.trim() !== "")
            setList(l => [...l, task]);
        
        setTask("");
    }

    function moveTaskUp(index){
        if (index === 0) 
            return;

        setList(l => {
            const newList = [...l];
            [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
            return newList;
        });
    }

    function moveTaskDown(index){
        if (index === list.length - 1) 
            return;
        
        setList(l => {
            const newList = [...l];
            [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
            return newList;
        });
    }

    function deleteTask(index){
        setList(l => l.filter((_, i) => i !== index));
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
                    <li key={index} className="h-[39px] min-w-72 px-2 mb-1 border-[#B0C7A5] border-2 rounded-md bg-[#E0E5B6] flex items-center">
                        <span className="flex-grow">{eachTask}</span>
                        <button 
                            className="mx-1 px-2 bg-blue-500 text-white rounded"
                            onClick={() => moveTaskUp(index)}
                        >
                            ⬆️
                        </button>
                        <button 
                            className="mx-1 px-2 bg-blue-500 text-white rounded"
                            onClick={() => moveTaskDown(index)}
                        >
                            ⬇️
                        </button>
                        <button 
                            className="mx-1 px-2 bg-red-500 text-white rounded"
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
