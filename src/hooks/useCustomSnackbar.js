import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux"

import { dequeue } from "../redux/slices/snackbarSlice";
import { useEffect } from "react";

const useCustomSnackbar =  () => {
     
    const message = useSelector((state) => state.snackbar.message);
    const variant = useSelector((state) => state.snackbar.variant);
    const open = useSelector((state) => state.snackbar.open);

    const dispatch = useDispatch();

    useEffect( () => {
        if(open) {
        enqueueSnackbar(message, {variant})
        dispatch(dequeue());
        }
    },[message,variant,open,dispatch])
}

export default useCustomSnackbar;