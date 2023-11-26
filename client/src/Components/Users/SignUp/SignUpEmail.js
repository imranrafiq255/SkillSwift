import { React, useState } from "react"; // Import useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./SignUpEmail.css";
import "./SlideTransition.css";
import MultiStepProgressBar from "./MultiStepProgressBar";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../Loader/Loading.js";
const SignUpEmail = () => {
  const [loading, setLoading] = useState(false);
  const index = 1;
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validateSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
        "must contain one letter, one number, and one special character"
      ),
  });

  const formHandler = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/createemail", values, {
        headers: {
          "Context-Type": "multipart/form-data",
        },
      });
      if (!response.data.success) {
        toastifyMessage(response.data.message);
        return;
      }
      setLoading(false);
      navigate("/contact", {
        state: { index: 2, id: response.data.id, isEmail: true },
      });
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
            <h3 className="text-email-info">Email Info</h3>
            <div className="form-group">
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="form-control my-2 email"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                style={{ color: "red" }}
                className="error-message"
              />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="form-control my-2 password"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                style={{
                  color: "red",
                  marginBottom: "20px",
                }}
                className="error-message"
              />
              <div className="already-account">
                <NavLink to={"/signin"}>already have an account?</NavLink>
              </div>
            </div>
            <button
              type="submit"
              className="form-control my-2 custom-button"
              style={{ height: "40px" }}
            >
              {loading ? <Loading /> : "Next"}
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
export default SignUpEmail;
