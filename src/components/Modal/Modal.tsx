import React from "react";
import classNames from "classnames";
import styles from './Modal.module.scss'


interface IModalProps{
    className?: string,
    children: React.ReactNode,
}

const Modal:React.FC<IModalProps> = ({className, children}) => {
    const classes = classNames(styles.modal, className)
    return <div className={classes} >
        {children}
    </div>
}

export default Modal