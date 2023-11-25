import {useForm} from "react-hook-form";
import moment from "moment";


const START_DATE = 'startDate'
const END_DATE = 'endDate'

const useMuiDateHook  =(props)=>{
     const {startDate = new Date(),endDate=new Date()} = props
    const form = useForm({
        mode: "onBlur",
        defaultValues: {
            [START_DATE]:  moment(startDate).format('MM/DD/YYYY'),
            [END_DATE]:  moment(endDate).format('MM/DD/YYYY')
        },
    });
    const {
        register,
        control,
        getValues,
        formState: {errors},
    } = form;
    const fieldsForm = {
       
        [START_DATE]: {
            require,
            fieldName: START_DATE,
            control,
        },
        [END_DATE]: {
            require,
            fieldName: END_DATE,
            control,
        },
    };
    return  {
        fieldsForm,form
    }
}


export default useMuiDateHook