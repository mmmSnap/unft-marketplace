
import cn from 'classnames'
import style from './BlockButton.module.sass'

const classNamevalue = {
    contained: {
        primary: 'primary',
        secondary: 'secondary',
        warning: 'warning',
        info: 'info',
        error: 'error',
        success: 'success'
    },
}


const BlockButton = ({ children, varient = "contained", color = "primary" }) => {

    console.log(cn(style.block, classNamevalue[varient]?.[color], style['blank']))
    return (
        <button className={cn(style.block, style[classNamevalue[varient]?.[color] || 'blank'])} >
            {children}
        </button>
    )


}

export default BlockButton