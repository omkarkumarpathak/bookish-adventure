import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [List, setList] = useState([
    { name: "Hello", id: uuidv4() },
    { name: "Hi There", id: uuidv4() },

  ]);

  const [input, setInput] = useState('');


  const addTodo = async () => {
    try {
      if (input.trim() !== '') {
        console.log(List);

        setList([
          ...List, { name: input, id: uuidv4() }
        ]);
        setInput('');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const [Edit, setEdit] = useState(-1);

  const updateEdit = async (index) => {
    setInput(List[index].name);
    setEdit(index);
  }

  const updateTodo = async () => {
    try {
      if (input.trim() !== '') {

        const updatedList = [...List];
        updatedList[Edit].name = input;
        setList(updatedList);
        setInput('');
        setEdit(-1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTodo=async(id)=>{ 
    console.log(id);
    let filteredList=List.filter((ele)=> ele.id !== id);
    setList(filteredList);
  }
  return (
    <div className="h-screen w-full flex flex-col items-center bg-sky-100">
      <div className="bg-yellow-200 p-3 mt-[15%] lg:w-[30%] sm:w-[45%]" >
        <h1 className="text-center mb-3 text-2xl font-bold">Todo</h1>
        <div className="flex justify-between">
          <input value={input} onChange={(e) => { setInput(e.target.value) }} type="text" className="w-full p-2 pl-5" placeholder="Type Here" />
          <button onClick={Edit == -1 ? addTodo : updateTodo} type="button" className="bg-red-300 p-3">
            {
              Edit == -1 ? "ADD" : "Update"
            }
          </button>
        </div>
        <div className="mt-3">
          {
            List.map((data, i) => {
              return (
                <div key={i} className="bg-blue-100 p-2 pl-5 rounded-md mt-3 flex justify-between ">

                  <div className="">
                    {data.name}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => updateEdit(i)} className="cursor-pointer">
                      Edit
                    </button>
                    <button onClick={()=>deleteTodo(data.id)} className="cursor-pointer">Delete</button>
                  </div>

                </div>
              )

            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
