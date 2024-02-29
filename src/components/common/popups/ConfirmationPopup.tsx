import React from 'react'
import { Modal, Button } from 'flowbite-react'

interface ConfirmationPopupProps {
    openModal: boolean,
    setOpenModal: any,
    headingText: string,
    mainText: string,
    actionButtonText: string,
    onActionBtnClick: any
}

const ConfirmationPopup = ({openModal, setOpenModal, headingText, mainText, actionButtonText, onActionBtnClick} : ConfirmationPopupProps) => {
    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>{headingText}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {mainText}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="green" onClick={() => onActionBtnClick() }>{actionButtonText}</Button>
                <Button color="red" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationPopup