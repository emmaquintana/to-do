import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todos")) || [];
    setData(storedData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("todos", JSON.stringify(data));
    }
  }, [data]);

  const addToDo = () => {
    if (inputData.trim().length > 0) {
      const toDo = {
        desc: inputData,
        isCompleted: false
      }

      setData((prevData) => [...prevData, toDo]);
    }
  }

  const removeAllToDo = () => {
    setData([]);
    localStorage.clear();
  }

  const completeToDo = (index) => {
    const newData = data.map((item, i) => { return i === index ? { ...item, isCompleted: !item.isCompleted } : item })
    setData(newData);
  }

  return (
    <main className="h-dvh w-dvw flex flex-col items-center justify-center gap-10">
      <h1 className="text-center font-extrabold text-4xl select-none">To-do list</h1>
      <input
        className="border border-gray-500 p-2 rounded-md"
        onChange={(e) => setInputData(e.target.value)}
      />
      <ul className="shadow-md h-52 w-80 overflow-auto text-center py-4 rounded-lg space-y-2">
        {data.map((item, index) => (
          <li
            key={index}
            className={"animate-fade-in break-words cursor-pointer select-none" + (item.isCompleted ? " line-through" : "")}
            onClick={() => completeToDo(index)}
          >
            {item.desc}
          </li>
        ))}
      </ul>
      <div className="space-x-4">
        <button
          className="text-white font-bold rounded-md p-2 bg-blue-500 hover:shadow-blue-500 transition-all hover:shadow-sm active:scale-95"
          onClick={addToDo}
        >
          Add To-Do
        </button>
        <button
          className="text-white font-bold rounded-md p-2 bg-red-500 hover:shadow-red-500 transition-all hover:shadow-sm active:scale-95"
          onClick={removeAllToDo}
        >
          Clear all
        </button>
      </div>
      {/*
      <button className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-md" onClick={() => localStorage.clear()}>Clear LS</button>      
      */}
    </main >
  );
}

export default App;
