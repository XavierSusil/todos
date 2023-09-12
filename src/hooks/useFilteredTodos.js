import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



const useFilteredTodos = () => {
    
    const filterStatus = useSelector((state) => state.filter.filter)
    const todos = useSelector((state) => state.login.user.todos)
    const sortOrder = useSelector((state) => state.filter.sort)
    
    const [filteredTodos, setFilteredTodos] = useState([])
    
    const filterFunction = (data, filter) => {
        
        if(filter === 'ALL') return data;  
        const filtered = data.filter(val => val.status === filter);

        return filtered ;
    }

    useEffect(() => {
        const filtered = filterFunction(todos, filterStatus);
        const sorted  = sortOrder === 'DESC' ? filtered : [...filtered].reverse();
        setFilteredTodos(sorted);
    },[todos,filterStatus,sortOrder])
    
    return filteredTodos;

}


export default useFilteredTodos;