import { React, useState } from "react"; // Import useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./SignUpSubmit.css";
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const SignUpContact = () => {
  const location = useLocation();
  const index = location.state && location.state.index;
  const id = location.state && location.state.id;
  const isEmail = location.state && location.state.isEmail;
  const [loading, setLoading] = useState(false);
  const override = css`
    margin-bottom: 5px;
  `;
  if (!isEmail) {
    return <p>You can't access this page directly</p>;
  }
  const initialValues = {
    terms: false,
  };
  const validateSchema = yup.object().shape({
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const formHandler = async (values) => {
    try {
      console.log(values);
      console.log(id);
      setLoading(true);
      const response = await axios.post(
        `/api/v1/users/submitrecord/${id}`,
        values,
        {
          headers: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        }
      );
      if (!response.data.success) {
        return toastifyMessage(response.data);
      }
      window.location.href = "/";
    } catch (error) {
      toastifyMessage(error.response.data.message);
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
        <div className="container center">
          <Form className="col-12 col-md-5 card px-3 py-3">
            <h3 className="text-center">Sign Up</h3>
            <div className="px-5 py-5">
              <MultiStepProgressBar index={index} />
            </div>
            <h3 className="text-terms-info">Term and Conditions</h3>
            <div className="term-container form-control">
              <Field type="checkbox" name="terms" />
              <h6>do you agree our terms and conditions?</h6>
              <ErrorMessage
                name="terms"
                component={"div"}
                style={{ color: "red" }}
              />
            </div>
            <div className="already-account">
              <NavLink to={"/signin"}>already have an account?</NavLink>
            </div>
            <button type="submit" className="form-control my-2">
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
