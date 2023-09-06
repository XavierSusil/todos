import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



const useFilteredTodos = () => {
    
    const filterStatus = useSelector((state) => state.filterStatus)
    const todos = useSelector((state) => state.login.user.todos)
    
    const [filteredTodos, setFilteredTodos] = useState([])
    
    const filterFunction = (data, filter) => {

        console.log("inside filter function '", data,filter);
        
        if(filter === 'ALL') return data;  
        
        return data.filter(val => val.status === filter);
    }

    useEffect(() => {
        const filtered = filterFunction(todos, filterStatus);
        setFilteredTodos(filtered);
    },[todos,filterStatus])

    return filteredTodos;

}


export default useFilteredTodos;