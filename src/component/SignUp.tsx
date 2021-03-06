import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FormApi, SubmissionErrors } from "final-form";
import { useAuth } from "../hook/useAuth";
import NavBar from "./ui/NavBar";
import { Text } from "./ui/Text";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import Input from "./ui/Input";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comfirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  comfirmPassword?: string;
}

export default function SignUp(): JSX.Element {
  const history = useHistory<Element>();
  const auth = useAuth()!;
  const [errMessage, setErrMessage] = useState<string>();

  const { from } = { from: { pathname: "/" } };

  const validate = (values: FormValues) => {
    const error: FormErrors = {};
    if (!values.firstName) {
      error.firstName = "Please enter your First Name";
    } else if (values.firstName.length < 2) {
      error.firstName = "Your First Name is too short";
    }

    if (!values.lastName) {
      error.lastName = "Please enter your Last Name";
    } else if (values.lastName.length < 2) {
      error.lastName = "Your Last Name is too short";
    }

    if (!values.email) {
      error.email = "Fill in your email";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.email,
      )
    ) {
      // Check email
      error.email = "Please enter a vaild email address";
    }

    if (!values.password) {
      error.password = "Please enter your password";
    } else if (values.password.length < 8) {
      error.password = "Your password too short";
    }

    if (values.comfirmPassword !== values.password) {
      error.comfirmPassword = "Password and Confirm password should match!";
    }
    return error;
  };

  const handleSubmit = (
    values: FormValues,
    _: FormApi<FormValues, Partial<FormValues>>,
    callback?: (errors?: SubmissionErrors) => void,
  ) => {
    auth
      .signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.comfirmPassword,
      )
      .then(() => {
        history.replace(from);
        callback!();
      })
      .catch((error) => {
        callback!({});
        if (error.status === 422) {
          setErrMessage("Invalid email address or password");
        } else {
          setErrMessage(error.data.message);
        }
      });
  };

  return (
    <>
      <NavBar />
      <div className="mx-auto mt-24 lg:w-1/2 xl:max-w-screen-sm">
        <div className="mt-10 px-16 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <Text.H3>Sign Up</Text.H3>
          <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
              <div className="mt-12">
                <form onSubmit={handleSubmit} noValidate>
                  <Text className={["text-red-500 text-center mb-4 font-bold"]}>
                    {errMessage}
                  </Text>
                  <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <Text.Small
                        className={["font-bold text-gray-700 tracking-wide"]}
                      >
                        First Name
                      </Text.Small>
                      <Field
                        name="firstName"
                        render={({ input, meta }) => (
                          <>
                            <Input
                              {...input}
                              className={[
                                `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                  meta.touched && !!meta.error
                                    ? "border-red-500"
                                    : ""
                                }`,
                              ]}
                              placeholder="Jane"
                              id="firstName"
                              name="firstName"
                              autoComplete="firstName"
                            />
                            {meta.touched && !!meta.error && (
                              <p className="text-red-500 text-xs italic text-sm">
                                {meta.error}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="md:w-1/2 px-3">
                      <Text.Small
                        className={["font-bold text-gray-700 tracking-wide"]}
                      >
                        Last Name
                      </Text.Small>
                      <Field
                        name="lastName"
                        render={({ input, meta }) => (
                          <>
                            <Input
                              {...input}
                              className={[
                                `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                  meta.touched && !!meta.error
                                    ? "border-red-500"
                                    : ""
                                }`,
                              ]}
                              placeholder="Doe"
                              id="lastName"
                              name="lastName"
                              autoComplete="lastName"
                            />
                            {meta.touched && !!meta.error && (
                              <p className="text-red-500 text-xs italic text-sm">
                                {meta.error}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Text.Small
                      className={["font-bold text-gray-700 tracking-wide"]}
                    >
                      Email
                    </Text.Small>
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <>
                          <Input
                            {...input}
                            className={[
                              `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                meta.touched && !!meta.error
                                  ? "border-red-500"
                                  : ""
                              }`,
                            ]}
                            placeholder="example@gmail.com"
                            id="email"
                            name="email"
                            autoComplete="email"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-8">
                    <Text.Small
                      className={["font-bold text-gray-700 tracking-wide"]}
                    >
                      Password
                    </Text.Small>
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <>
                          <Input
                            {...input}
                            className={[
                              `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                meta.touched && !!meta.error
                                  ? "border-red-500"
                                  : ""
                              }`,
                            ]}
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-8">
                    <Text.Small
                      className={["font-bold text-gray-700 tracking-wide"]}
                    >
                      Confirm Password
                    </Text.Small>
                    <Field
                      name="comfirmPassword"
                      render={({ input, meta }) => (
                        <>
                          <Input
                            {...input}
                            className={[
                              `w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 ${
                                meta.touched && !!meta.error
                                  ? "border-red-500"
                                  : ""
                              }`,
                            ]}
                            placeholder="Re-enter your password"
                            id="comfirmPassword"
                            name="comfirmPassword"
                            type="password"
                            autoComplete="comfirmPassword"
                          />
                          {meta.touched && !!meta.error && (
                            <p className="text-red-500 text-xs italic text-sm">
                              {meta.error}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <Text.Small
                    className={["flex my-3.5 font-display font-semibold"]}
                  >
                    Already have an account?&nbsp;{" "}
                    <Link to="/login">Log In</Link>
                  </Text.Small>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Loading..." : "Sign Up"}
                  </Button>
                </form>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}
