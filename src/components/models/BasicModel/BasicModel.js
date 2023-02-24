import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FormElement from './ModelElements/FormElement/FormElement'

export default function BasicModel (props) {
  const {
    show,
    handleClose,
    modelHeader,
    modelText,
    modelForm,
    primaryButton,
    secondaryButton,
    handleChange,
    errorMessage
  } = props

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h5>{modelHeader}</h5>
      </Modal.Header>

      <Modal.Body>
        {modelText && <p>{modelText}</p>}
        {modelForm &&
          modelForm.map((element) => {
            return (
              <FormElement
                key={element.labelText}
                value={element.value}
                labelText={element.labelText}
                type={element.type}
                placeHolder={element.placeHolder}
                handleChange={(e) => handleChange(e, element.labelText)}
              />
            )
          })}
        {errorMessage && errorMessage?.show && (
          <div className="errorMessage">{errorMessage.message}</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {secondaryButton && (
          <Button variant="outline-secondary" onClick={secondaryButton.onClickHandler}>
            {secondaryButton.buttonText}
          </Button>
        )}
        {primaryButton && (
          <Button variant="primary" onClick={primaryButton.onClickHandler}>
            {primaryButton.buttonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

