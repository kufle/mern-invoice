import { Formik, FormikProps } from 'formik';
import * as Yup from "yup";
import { useRegisterUserMutation } from '../authApiSlice';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import { Grid, InputLabel, Stack } from '@mui/material';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  submit: null | string;
}

function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
					lastName: "",
					email: "",
					username: "",
					password: "",
					passwordConfirm: "",
					submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .max(255)
            .required('First Name is required'),
          lastName: Yup.string()
						.max(255)
						.required("Last Name is required"),
          username: Yup.string()
						.matches(
							USERNAME_REGEX,
							"Should be between 4 and 24 characters. Letters, numbers, underscores, hyphens allowed. Special characters not allowed!"
						)
						.required("A username is required"),
          email: Yup.string()
						.email("Must be a valid email")
						.max(255)
						.required("Email is required"),
          password: Yup.string()
						.max(255)
						.required("Password is required"),
        })}
        onSubmit={async (values, {setStatus, setSubmitting}) => {
          try {
            await registerUser(values).unwrap();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error: unknown) {
            const fetchError = error as { data: { message: string } };

            const message = fetchError.data.message;
            toast.error(message);
            setStatus({ success: false });
						setSubmitting(false);
          }
        }}
      >
        <h1>HELLO</h1>
      </Formik>
    </>
  )
}

export default RegisterForm