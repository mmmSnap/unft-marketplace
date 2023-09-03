
import style from './InputElement.module.sass'

const InputElement = ({onChange,...props})=>{

    return (
        <input placeholder='Enter your email id' type="text" className={style.InputElem} {...props}  onChange={(e)=>onChange(e.target.value)}  />
    )
}

export default InputElement