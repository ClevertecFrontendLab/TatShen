import React from "react";
import classNames from "classnames";
import cleverFit from '../../assets/cleverFit.svg'
import styles from './Modal.module.scss'


interface IModalProps{
    className?: string,
    children: React.ReactNode,
}

const Modal:React.FC<IModalProps> = ({className, children}) => {
    const classes = classNames(styles.modal, className)
    return <div className={classes} >
        {className == '_enter_modal_1b4hv_1'? <img src={cleverFit} alt="cleverFit" className={styles.modal_logo}></img> : '' }
        {children}
    </div>
}

export default Modal