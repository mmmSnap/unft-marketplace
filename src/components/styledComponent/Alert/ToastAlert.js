import { useEffect } from "react";
import { Collapse, Alert } from "@mui/material";

const ToastAlert = (props) => {
    const { type = "success", message, isOpen,setIsOpen } = props;
    useEffect(() => {
        if (isOpen && setIsOpen) {
            setTimeout(() => {
                setIsOpen(false)
            }, 4000)
        }
    }, [isOpen])
    return (
        <Collapse in={isOpen} sx={{  zIndex: 1400,}}>
            <Alert  severity={type} sx={{  zIndex: 1400,}}>
                {message}
            </Alert>
        </Collapse>
    );
};

export default ToastAlert;
