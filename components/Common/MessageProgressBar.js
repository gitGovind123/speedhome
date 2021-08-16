import React, {useEffect, useState} from 'react'

import { ProgressBar } from 'react-bootstrap'
import styles from './MessageProgressBar.module.scss'

const MessageProgressBar = props => {
    const { label } = props
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(true)
        setTimeout(() => {
            setIsShow(false)
        }, 3000)
    },[])

    return (
         isShow ?
            <ProgressBar
                className={`${styles['message_progress_bar']} message_progress_bar`}
                now={100}
                label={label}
            />
        :
           null
    )
}

export default MessageProgressBar

