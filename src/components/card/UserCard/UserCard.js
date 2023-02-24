import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./UserCard.css";
import UserDetails from "./UserDetails/UserDetails";
import MessageIcon from "../../../assets/envelope.png";
import PhoneIcon from "../../../assets/telephone.png";
import WebIcon from "../../../assets/www.png";
import EditIcon from "../../../assets/edit.png";
import DeleteIcon from "../../../assets/dustbin.png";
import HollowHeartIcon from "../../../assets/hollow_heart.png";
import FilledHeartIcon from "../../../assets/filled_heart.png";
import BasicModel from "../../models/BasicModel/BasicModel";
import {
  AVARTAR_MODE,
  CANCEL,
  DELETE,
  DELETE_HEADER,
  DELETE_MODEL_TEXT,
  DELETE_SUCCESS,
  EDIT_HEADER,
  OK,
  UPDATE_SUCCESS,
} from "../../Constants";
import Loader from "../../loader/Loader";
import { Alert, Snackbar } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { isEmpty, validateData } from "../../CommonMethods";
import { AVATAR_URL } from "../../../config/dev.env";
import Image from "./UserDetails/ImageElement/Image";

export default function UserCard() {
  const userContext = useContext(UserContext);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [formDetails, setFormDetails] = useState([
    {
      labelText: "Name",
      type: "text",
      value: null,
      placeHolder: "Enter Name",
    },
    {
      labelText: "Email",
      type: "email",
      value: null,
      placeHolder: "Enter Email",
    },
    {
      labelText: "Phone",
      type: "text",
      value: null,
      placeHolder: "Enter Phone",
    },
    {
      labelText: "Website",
      type: "text",
      value: null,
      placeHolder: "Enter Website",
    },
  ]);
  const [toast, setToast] = useState({
    toastShow: false,
    variant: "success",
    message: "",
    vertical: "bottom",
    horizontal: "center",
  });

  // Edit PopUp
  const handleEdit = (userToEdit) => {
    setEditUser({ ...userToEdit });
    formDetails.forEach((element) => {
      element.value = userToEdit[element.labelText.toLowerCase()];
    });
    setFormDetails([...formDetails]);
    setShowEditPopUp(true);
  };
  const handleEditClose = () => {
    setShowEditPopUp(false);
  };
  const handleUpdate = () => {
    const isEmptyMessage = isEmpty(editUser,formDetails);
    const validateDataMessage = validateData(editUser,formDetails);
    if (!isEmptyMessage && !validateDataMessage) {
      userContext.users.forEach((user, index) => {
        if (user.id === editUser.id) {
          userContext.users[index] = { ...editUser };
        }
      });
      userContext.setUsers([...userContext.users]);
      handleEditClose();
      setToast({
        ...toast,
        toastShow: true,
        message: UPDATE_SUCCESS,
      });
    } else {
      const errorMessage = isEmptyMessage || validateDataMessage;
      setErrorMessage({
        show: true,
        message: errorMessage,
      });
      setTimeout(() => {
        setErrorMessage({
          show: false,
          message: "",
        });
      }, 2000);
    }
  };
  // Edit PopUp

  // handleChange
  const handleChange = (e, type) => {
    const changedValued = e.target.value;
    let edit = false;
    let regName = null;
    switch (type.toLowerCase()) {
      case "name":
        regName = /^[a-zA-Z ]{0,30}$/;
        if (regName.test(changedValued)) {
          editUser.name = changedValued;
          edit = true;
        }
        break;
      case "email":
        regName = /^[a-zA-Z0-9_@?.]*$/;
        if (regName.test(changedValued)) {
          editUser.email = changedValued;
          edit = true;
        }
        break;
      case "phone":
        regName = /^[0-9-+()x ]*$/;
        if (regName.test(changedValued)) {
          editUser.phone = changedValued;
          edit = true;
        }
        break;
      case "website":
        regName = /^[a-zA-Z0-9.://_]*$/;
        if (regName.test(changedValued)) {
          editUser.website = changedValued;
          edit = true;
        }
        break;
      default:
        break;
    }

    if (edit) {
      setEditUser({ ...editUser });
      formDetails.forEach((element) => {
        element.value = editUser[element.labelText.toLowerCase()];
      });
      setFormDetails([...formDetails]);
    }
  };
  // handleChange

  // Delete PopUp
  const handleDelete = (id) => {
    setShowDeletePopUp(true);
    setDeleteUserId(id);
  };
  const handleDeleteUser = () => {
    if (deleteUserId) {
      const filteredUsers = userContext.users.filter(
        (user) => user.id !== deleteUserId
      );
      userContext.setUsers(filteredUsers);
    }
    setShowDeletePopUp(false);
    setToast({
      ...toast,
      toastShow: true,
      message: DELETE_SUCCESS,
    });
  };
  const handleDeleteClose = () => {
    setShowDeletePopUp(false);
    setDeleteUserId(null);
  };
  // Delete PopUp

  // Favourite
  const handleFavourite = (id, value) => {
    if (id) {
      userContext.users.forEach((user) => {
        if (user.id === id) {
          user.favourite = value;
        }
      });
      userContext.setUsers([...userContext.users]);
    }
  };
  // Favourite

  const handleCloseToast = () => {
    setToast({
      ...toast,
      toastShow: false,
      message: "",
    });
  };
  const { vertical, horizontal, toastShow } = toast;
  return (
    <>
      {userContext.users && userContext.users.length > 0 ? (
        <Row className="g-0 p-2">
          {userContext.users.map((user) => (
            <Col key={user.id} xs={1} sm={2} md={4} xl={3} className="p-2">
              <Card className="usercard-card-borderRadius">
                <div className="usercard-card-div">
                  <Card.Img
                    variant="top"
                    className="usercard-card-img"
                    src={
                      AVATAR_URL +
                      user.username +
                      AVARTAR_MODE
                    }
                  />
                </div>
                <Card.Body>
                  <div className="usercard-div-userData">{user.name}</div>
                  <UserDetails
                    imgSrc={MessageIcon}
                    data={user.email}
                    altText={"envelope"}
                  />
                  <UserDetails
                    phoneIcon={true}
                    imgSrc={PhoneIcon}
                    data={user.phone}
                    altText={"envelope"}
                  />
                  <UserDetails
                    imgSrc={WebIcon}
                    data={"http://" + user.website}
                    altText={"envelope"}
                  />
                </Card.Body>
                <Card.Footer className="actionDiv">
                  {user.favourite ? (
                    <Image
                      onClick={() => handleFavourite(user.id, false)}
                      imgSrc={FilledHeartIcon}
                      altText={"filled_heart"}
                    />
                  ) : (
                    <Image
                      onClick={() => handleFavourite(user.id, true)}
                      imgSrc={HollowHeartIcon}
                      altText={"hollow_heart"}
                    />
                  )}
                  <div className="vr" />
                  <Image
                    imgSrc={EditIcon}
                    altText={"edit"}
                    onClick={() => handleEdit(user)}
                  />
                  <div className="vr" />
                  <Image
                    imgSrc={DeleteIcon}
                    altText={"delete"}
                    onClick={() => handleDelete(user.id)}
                  />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
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
          onClickHandler: handleEditClose,
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
          onClickHandler: handleDeleteClose,
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
  );
}
