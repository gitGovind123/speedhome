import ReactDOM from 'react-dom'
import ClearIcon from '@material-ui/icons/Clear'

const DeleteChatModal = props => {
  const {
    styles,
    displayStatus,
    setDeleteConfirmationModal,
    archiveConversation
  } = props
  return displayStatus
    ? ReactDOM.createPortal(
        <div className={styles['deleteChatModalWrapper']}>
          <div className={styles['deleteChatModalAlertBox']}>
            <div
              onClick={_ => setDeleteConfirmationModal(false)}
              className={styles['deleteChatModalCloseContainer']}
            >
              <ClearIcon color='#000' />
            </div>
            <div className={styles['deleteChatModalTitle']}>Delete Chat</div>
            <div className={styles['deleteChatModalMessage']}>
              This action cannot be undone.
            </div>
            <div className={styles['deleteChatModalActions']}>
              <div
                onClick={_ => setDeleteConfirmationModal(false)}
                className={styles['deleteChatModalActions__item']}
              >
                Cancel
              </div>
              <div
                onClick={_ => {
                  archiveConversation()
                  setDeleteConfirmationModal(false)
                }}
                data-testId='chat__list-item__delete-confirm'
                className={`${styles['deleteChatModalActions__item']} ${styles['deleteChatModalActions__item--deleteBtn']}`}
              >
                Delete
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}

export default DeleteChatModal
