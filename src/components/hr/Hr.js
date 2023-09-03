
import style from './Hr.module.sass'

const Hr  =({children})=>{

    return (
        <h4 className={style.hr}><span className={style.span}>{children}</span></h4>
    )

}

export default Hr