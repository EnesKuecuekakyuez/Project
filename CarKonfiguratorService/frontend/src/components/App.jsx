import axios from "axios";
import {useState, useEffect} from "react";
import "../styles/App.css"

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080")
    setArray(response.data.blogPost)
  }


  useEffect(() => {
    fetchData();

  }, [])
  return (
    <>
     <div>
      <h1 className="logo">
      test
      </h1>

      <ul>
          {
            array.map((blog,index) => (
              <li key={index}
              className='bg-sky-100 p-4 rounded-2xl transition-transform transform hover:scale-105'>
                <p className='text-x1 font-semibold text-gray-800'>
                  {blog.title}
                </p>
                <p className='text-sm text-gray-100'>
                  {blog.content}
                </p>
              </li>
            ))
          }
      </ul>
     </div>
    </>
  )
}

export default App
