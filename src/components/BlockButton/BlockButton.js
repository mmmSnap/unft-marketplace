
import style from './BlockButton.module.sass'

const BlockButton = ({children})=>{


    return (
        <button className={style.block} >
         {children}
        </button>
    )


}

export default BlockButton