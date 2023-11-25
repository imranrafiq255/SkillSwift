import { React, useState } from "react"; // Import useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./SignUpContact.css";
import "./SlideTransition.css";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SignUpContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state && location.state.index;
  const id = location.state && location.state.id;
  const isEmail = location.state && location.state.isEmail;
  const [avatar, setAvatar] = useState(false);
  const [showImageInput, setImageInput] = useState(true);
  const [loading, setLoading] = useState(false);

  const override = css`
    margin-bottom: 5px;
  `;
  if (!isEmail) {
    <p>You can't access this page directly</p>;
    return;
  }
  const initialValues = {
    name: "",
    phoneNumber: "",
    avatar: null,
  };

  const validateSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  });

  const formHandler = async (values) => {
    const data = { ...values, avatar };
    try {
      setLoading(true);
      await axios.post(`/api/v1/users/createcontactinfo/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/submit", { state: { index: 3, id: id, isEmail: true } });
    } catch (error) {
      console.log(error.message);
      toastifyMessage(error.response.data.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={formHandler}
      >
        <div className="container center slide-transition">
          <Form className="col-12 col-md-5 card px-3 py-3">
            <h3 className="text-center">Sign Up</h3>
            <div className="px-5 py-5">
              <MultiStepProgressBar index={index} />
            </div>
            <h3 className="text-email-info">Contact Info</h3>
            <div className="avatar-container">
              {avatar && (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt=""
                  width={100}
                  height={100}
                  className="image-fluid avatar text-center"
                />
              )}
            </div>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control my-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />
            <Field
              type="tel"
              name="phoneNumber"
              placeholder="923036751255"
              className="form-control my-2"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              style={{ color: "red" }}
            />
            {showImageInput ? (
              <Field
                type="file"
                name="image"
                className="form-control avatar-input"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  setImageInput(false);
                }}
              />
            ) : null}
            <div className="already-account">
              <NavLink to={"/signin"}>already have an account?</NavLink>
            </div>
            <button type="submit" className="form-control my-2 text-white">
              {loading ? (
                <PropagateLoader
                  css={override}
                  color={"white"}
                  size={10}
                  loading={loading}
                />
              ) : (
                "Next"
              )}
            </button>
          </Form>
        </div>
      </Formik>
    </>
  );
};

const toastifyMessage = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export default SignUpContact;
