import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '@material-ui/core/Button'

function ReportModal ({ show, handleClose, reportConversation, reportMsg }) {
  const [confirmShow, setConfirmShow] = React.useState(false)

  const report = reason => {
    reportConversation(reason)
    handleClose()
    setConfirmShow(true)
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton centered size='sm'>
          <Modal.Title>Reason for Report</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => report('User is attempting to scam me')}
          >
            User is attempting to scam me
          </Button>
          <Button
            variant='secondary'
            onClick={() => report('Landlord is asking for deposit')}
          >
            Landlord is asking for deposit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmShow} onHide={() => setConfirmShow(false)}>
        <Modal.Header closeButton centered size='sm'>
          <Modal.Title>Reason for Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>{reportMsg}</Modal.Body>
      </Modal>
    </div>
  )
}

export default ReportModal
