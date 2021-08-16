import React, { useState, useEffect } from 'react'

import { Row, Col } from 'react-bootstrap'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'
import styles from './ProgressBar.module.scss'

const ProgressBar = props => {
    const { activeStep, currentStep, nextStep, totalSteps } = props
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        let steps = (activeStep/totalSteps)*100
        setPercentage(steps)
    },[activeStep])

    return (
        <div className={`${styles['progress_bar_step']} ${styles['justify-content-md-center']}`}>
            <Row>
                <Col xs={3} md={5} className={styles['progress_bar_col']}>
                    <div className={styles['progressbar_div']}>
                        <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={5}
                            styles={buildStyles({
                                textSize: '20px',
                                pathTransitionDuration: 0.5,
                                pathColor: '#26CC21',
                                textColor: '#000',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        >
                            <strong>
                                {Math.round(percentage)}%
                            </strong>
                        </CircularProgressbarWithChildren>
                    </div>
                </Col>
                <Col xs={8} sm={6} md={6} xl={6}>
                    <strong>
                        { currentStep }
                    </strong>
                    <span className={styles['next_text']}>
                      Next: { nextStep }
                    </span>
                </Col>
            </Row>
        </div>
    )
}

export default ProgressBar

