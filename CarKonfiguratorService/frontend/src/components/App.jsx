import axios from "axios";
import {useState, useEffect} from "react";
import "../styles/App.css"
import Navbar from './Navbar'
import Configurator from './Configurator'


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
      <Navbar />
      <Configurator/>
     </div>
    </>
  )
}

export default App
