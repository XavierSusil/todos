import { useEffect,useState } from "react";
import useSearchedTodos from "./useSearchedTodos"


/**
 * This useState provides data for masonry layout grid 
 * This takes a single list of todos that need to be displayed into a list of list of todos 
 * splited based on the index in the todos 
 * @param {} columns 
 * @returns a array with {columns} number of columns that are array of todos
 */
const useMasonryTodos = (columns = 3) => {
    const todos = useSearchedTodos();

    const [masonryTodos,setMasonryTodos] = useState([]);

    useEffect(() => {
        const matrix = Array.from({length: columns},()=>[]);

        todos.forEach((todo,index) => {
            let columnIndex = index % columns;
            matrix[columnIndex].push(todo);
        })
        setMasonryTodos(matrix);
    },[columns, todos]);

    return masonryTodos;
}

export default useMasonryTodos;