import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import Header from "../Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { createForm } from "../../../data/services/api";
import { useNavigate } from "react-router-dom";
import "./CreateForm.css";
import ConfirmForm from "../popup/ConfirmForm";
const CreateForm: React.FC = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    type: "",
    status: "",
    message: "",
  });
  const mode = useTheme();
  const colors = tokens(mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialValues = {
    userName: "",
    age: "",
    email: "",
    phoneNumber: "",
  };
  const navigate = useNavigate();
  //   const validate = (values): ValidationErrors[] => {
  //     console.log("values", values);

  //     const errors: ValidationErrors[] = [];
  //     if (values.userName && values.userName.length < 3) {
  //       errors.push({
  //         field: "userName",
  //         message: "The name must be at least 3 characters long",
  //       });
  //       console.log("length", values.userName.length);
  //       console.log("errors", errors);
  //     }
  //     if (isNaN(values.age)) {
  //       errors.push({
  //         field: "age",
  //         message: "The age must be a number",
  //       });
  //     }
  //     if (values.age < 18) {
  //       errors.push({
  //         field: "age",
  //         message: "The age must be at least 18 years old",
  //       });
  //     }
  //     if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(values.email)) {
  //       errors.push({
  //         field: "email",
  //         message: "The email is not valid",
  //       });
  //     }
  //     if (!/^[0-9]{10}$/.test(values.phoneNumber)) {
  //       errors.push({
  //         field: "phoneNumber",
  //         message: "The phone number is not valid",
  //       });
  //     }
  //     return errors;
  //   };

  const required = (value: string) => (value ? undefined : "Required");
  const mustBeNumber = (value: number) =>
    isNaN(value) ? "Must be a number" : undefined;
  const minValue = (min: number) => (value: number) =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const validateType = (type: string) => (value: any) => {
    if (typeof value !== type) {
      return `Must be a ${type}`;
    }
    return undefined;
  };
  const minFirstName = (minFirst: string) => (value: string) => {
    return value.length >= minFirst.length
      ? undefined
      : `The name must be at least ${minFirst} characters long"`;
  };
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  const onSubmit = (values) => {
    const payload = {
      ...values,
    }; // Hiển thị giá trị values sau khi submit

    createForm(payload)
      .then((response) => {
        console.log(response);
        const popupType = response.type ?? "";
        const popupStatus = response.status ?? "";
        const popupMessage = response.message ?? ""; // Xử lý kết quả trả về từ API (CreatedResult)
        //Nếu tạo mới thành công, chuyển hướng về component Team
        setPopupData({
          type: popupType,
          status: popupStatus,
          message: popupMessage,
        });
        setOpenPopup(true);
        navigate("/team");
      })
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="CREATE USER"
          subtitle="Create a New User Profile"
          fontSize={{ xs: "2rem", md: "1.5rem" }}
        />
        <Form onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2,minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <Field
                  name="userName"
                  validate={composeValidators(
                    required,
                    validateType("string"),
                    minFirstName("3")
                  )}
                >
                  {({ input, meta }) => (
                    <div className="grid">
                      <label className="label">User Name</label>
                      <TextField
                        className="text-field"
                        fullWidth
                        {...input}
                        type="text"
                        placeholder="User Name"
                        sx={{ gridColumn: "span 3" }}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field
                  name="age"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    minValue(18)
                  )}
                >
                  {({ input, meta }) => (
                    <div className="grid">
                      <label className="label">Age</label>
                      <TextField
                        className="text-field"
                        fullWidth
                        {...input}
                        type="text"
                        placeholder="Age"
                        sx={{ gridColumn: "span 3" }}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="email" validate={required}>
                  {({ input, meta }) => (
                    <div className="grid">
                      <label className="label">Email</label>
                      <TextField
                        className="text-field"
                        fullWidth
                        {...input}
                        type="text"
                        placeholder="Email"
                        sx={{ gridColumn: "span 3" }}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field
                  name="phoneNumber"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <div className="grid">
                      <label className="label">Phone Number</label>
                      <TextField
                        className="text-field"
                        fullWidth
                        {...input}
                        type="text"
                        placeholder="Phone Number"
                        sx={{ gridColumn: "span 3" }}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  style={{ marginTop: "30px" }}
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.primary[100],
                  }}
                  variant="contained"
                >
                  Create New User
                </Button>
                <ConfirmForm
                  open={openPopup}
                  onClose={() => setOpenPopup(false)}
                  type={popupData.type}
                  status={popupData.status}
                  message={popupData.message}
                />
              </Box>
            </form>
          )}
        </Form>
      </Box>
    </>
  );
};

export default CreateForm;
