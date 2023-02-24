import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './UserCard.css'
import UserDetails from './UserDetails/UserDetails'
import MessageIcon from '../../../assets/envelope.png'
import PhoneIcon from '../../../assets/telephone.png'
import WebIcon from '../../../assets/www.png'
import EditIcon from '../../../assets/edit.png'
import DeleteIcon from '../../../assets/dustbin.png'
import HollowHeartIcon from '../../../assets/hollow_heart.png'
import FilledHeartIcon from '../../../assets/filled_heart.png'
import Image from '../../models/BasicModel/ModelElements/Image/Image'
import BasicModel from '../../models/BasicModel/BasicModel'
import {
  CANCEL,
  DELETE,
  DELETE_HEADER,
  DELETE_MODEL_TEXT,
  DELETE_SUCCESS,
  EDIT_HEADER,
  EMAIL_REGEX,
  OK,
  PHONE_REGEX,
  UPDATE_SUCCESS,
  WEBSITE_REGEX
} from '../../Constants'
import Loader from '../../loader/Loader'
import { Alert, Snackbar } from '@mui/material'

export default function UserCard () {
  const [showEditPopUp, setShowEditPopUp] = useState(false)
  const [showDeletePopUp, setShowDeletePopUp] = useState(false)
  const [users, setUsers] = useState(null)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [editUser, setEditUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: ''
  })
  const [formDetails, setFormDetails] = useState([
    {
      labelText: 'Name',
      type: 'text',
      value: null,
      placeHolder: 'Enter Name'
    },
    {
      labelText: 'Email',
      type: 'email',
      value: null,
      placeHolder: 'Enter Email'
    },
    {
      labelText: 'Phone',
      type: 'text',
      value: null,
      placeHolder: 'Enter Phone'
    },
    {
      labelText: 'Website',
      type: 'text',
      value: null,
      placeHolder: 'Enter Website'
    }
  ])
  const [toast, setToast] = useState({
    toastShow: false,
    variant: 'success',
    message: '',
    vertical: 'bottom',
    horizontal: 'center'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const parsedData = await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.text())
      .then((data) => {
        return JSON.parse(data)
      })
    setUsers([...parsedData])
  }

  const isEmpty = () => {
    for (const element of formDetails) {
      if (editUser[element.labelText.toLowerCase()] === '') {
        setErrorMessage({
          show: true,
          message: element.labelText + ' is a required field'
        })
        setTimeout(() => {
          setErrorMessage({
            show: false,
            message: ''
          })
        }, 2000)
        return true
      }
    }
    return false
  }

  const validateData = () => {
    for (const element of formDetails) {
      let regex = null
      const key = element.labelText.toLowerCase()
      switch (key) {
        case 'name':
          regex = /^[a-zA-Z ]{0,30}$/
          break
        case 'email':
          regex = EMAIL_REGEX
          break
        case 'phone':
          regex = PHONE_REGEX
          break
        case 'website':
          regex = WEBSITE_REGEX
          break
        default:
          break
      }

      if (editUser[key] !== '' && !regex.test(editUser[key])) {
        setErrorMessage({
          show: true,
          message: element.labelText + ' is not valid'
        })
        setTimeout(() => {
          setErrorMessage({
            show: false,
            message: ''
          })
        }, 2000)
        return true
      }
    }
    return false
  }

  // Edit PopUp
  const handleEdit = (userToEdit) => {
    setEditUser({ ...userToEdit })
    formDetails.forEach((element) => {
      element.value = userToEdit[element.labelText.toLowerCase()]
    })
    setFormDetails([...formDetails])
    setShowEditPopUp(true)
  }
  const handleEditClose = () => {
    setShowEditPopUp(false)
  }
  const handleUpdate = () => {
    if (!isEmpty() && !validateData()) {
      users.forEach((user, index) => {
        if (user.id === editUser.id) {
          users[index] = { ...editUser }
        }
      })
      setUsers([...users])
      handleEditClose()
      setToast({
        ...toast,
        toastShow: true,
        message: UPDATE_SUCCESS
      })
    }
  }
  // Edit PopUp

  // handleChange
  const handleChange = (e, type) => {
    const changedValued = e.target.value
    let edit = false
    let regName = null
    switch (type.toLowerCase()) {
      case 'name':
        regName = /^[a-zA-Z ]{0,30}$/
        if (regName.test(changedValued)) {
          editUser.name = changedValued
          edit = true
        }
        break
      case 'email':
        regName = /^[a-zA-Z0-9_@?.]*$/
        if (regName.test(changedValued)) {
          editUser.email = changedValued
          edit = true
        }
        break
      case 'phone':
        regName = /^[0-9-+()x ]*$/
        if (regName.test(changedValued)) {
          editUser.phone = changedValued
          edit = true
        }
        break
      case 'website':
        regName = /^[a-zA-Z0-9.://_]*$/
        if (regName.test(changedValued)) {
          editUser.website = changedValued
          edit = true
        }
        break
      default:
        break
    }

    if (edit) {
      setEditUser({ ...editUser })
      formDetails.forEach((element) => {
        element.value = editUser[element.labelText.toLowerCase()]
      })
      setFormDetails([...formDetails])
    }
  }
  // handleChange

  // Delete PopUp
  const handleDelete = (id) => {
    setShowDeletePopUp(true)
    setDeleteUserId(id)
  }
  const handleDeleteUser = () => {
    if (deleteUserId) {
      const filteredUsers = users.filter((user) => user.id !== deleteUserId)
      setUsers(filteredUsers)
    }
    setShowDeletePopUp(false)
    setToast({
      ...toast,
      toastShow: true,
      message: DELETE_SUCCESS
    })
  }
  const handleDeleteClose = () => {
    setShowDeletePopUp(false)
    setDeleteUserId(null)
  }
  // Delete PopUp

  // Favourite
  const handleFavourite = (id, value) => {
    if (id) {
      users.forEach((user) => {
        if (user.id === id) {
          user.favourite = value
        }
      })
      setUsers([...users])
    }
  }
  // Favourite

  const handleCloseToast = () => {
    setToast({
      ...toast,
      toastShow: false,
      message: ''
    })
  }
  const { vertical, horizontal, toastShow } = toast
  return (
    <>
      {users && users.length > 0
        ? (
        <Row className="g-0 p-2">
          {users.map((user) => (
            <Col key={user.id} xs={1} sm={2} md={4} xl={3} className="p-2">
              <Card className="usercard-card-borderRadius">
                <div className="usercard-card-div">
                  <Card.Img
                    variant="top"
                    className="usercard-card-img"
                    src={
                      'https://avatars.dicebear.com/v2/avataaars/' +
                      user.username +
                      '.svg?options[mood][]=happy'
                    }
                  />
                </div>
                <Card.Body>
                  <div className="usercard-div-userData">{user.name}</div>
                  <UserDetails imgSrc={MessageIcon} data={user.email} altText={'envelope'} />
                  <UserDetails
                    phoneIcon={true}
                    imgSrc={PhoneIcon}
                    data={user.phone}
                    altText={'envelope'}
                  />
                  <UserDetails
                    imgSrc={WebIcon}
                    data={'http://' + user.website}
                    altText={'envelope'}
                  />
                </Card.Body>
                <Card.Footer className="actionDiv">
                  {user.favourite
                    ? (
                    <Image
                      onClick={() => handleFavourite(user.id, false)}
                      imgSrc={FilledHeartIcon}
                      altText={'filled_heart'}
                    />
                      )
                    : (
                    <Image
                      onClick={() => handleFavourite(user.id, true)}
                      imgSrc={HollowHeartIcon}
                      altText={'hollow_heart'}
                    />
                      )}
                  <div className="vr" />
                  <Image imgSrc={EditIcon} altText={'edit'} onClick={() => handleEdit(user)} />
                  <div className="vr" />
                  <Image
                    imgSrc={DeleteIcon}
                    altText={'delete'}
                    onClick={() => handleDelete(user.id)}
                  />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
          )
        : (
        <Loader />
          )}

      <BasicModel
        show={showEditPopUp}
        handleClose={handleEditClose}
        modelHeader={EDIT_HEADER}
        modelForm={formDetails}
        handleChange={handleChange}
        errorMessage={errorMessage}
        primaryButton={{ buttonText: OK, onClickHandler: handleUpdate }}
        secondaryButton={{
          buttonText: CANCEL,
          onClickHandler: handleEditClose
        }}
      />
      <BasicModel
        show={showDeletePopUp}
        handleClose={handleDeleteClose}
        modelHeader={DELETE_HEADER}
        modelText={DELETE_MODEL_TEXT}
        primaryButton={{ buttonText: DELETE, onClickHandler: handleDeleteUser }}
        secondaryButton={{
          buttonText: CANCEL,
          onClickHandler: handleDeleteClose
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={toastShow}
        onClose={handleCloseToast}
        autoHideDuration={2000}
      >
        <Alert onClose={handleCloseToast} severity="success">
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}
