import { useEffect } from 'react'
import useTitle from '../../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePasswordResetRequestMutation } from '../authApiSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthWrapper from '../forms/AuthWrapper';
import { Box, Button, Container, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import StyledDivider from '../../../components/StyledDivider';
import { GoMail } from "react-icons/go";
import Spinner from '../../../components/Spinner';
import SendIcon from '@mui/icons-material/Send';

function PasswordResetRequestPage() {
  useTitle("Request Reset Password");
  const navigate = useNavigate();
	// -1 means go back to the previous page where you came from
	const goBack = () => navigate(-1);

  const [passwordResetRequest, { data, isLoading, isSuccess }] =
		usePasswordResetRequestMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
			const message = data.message;
			toast.success(message);
		}
	}, [data, isSuccess, navigate]);

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
				validationSchema={Yup.object().shape({
					email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						await passwordResetRequest(values).unwrap();
						setStatus({ success: true });
						setSubmitting(false);
					} catch (err: any) {
						const message = err.data.message;
						toast.error(message);
						setStatus({ success: false });
						setSubmitting(false);
					}
				}}
      >
        {({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					touched,
					values,
				}) => (
          <AuthWrapper>
            <Container
							component="main"
							maxWidth="sm"
							sx={{
								border: "2px solid  #e4e5e7",
								borderRadius: "25px",
								py: 2,
							}}
						>
              <form
								noValidate
								autoComplete="off"
								onSubmit={handleSubmit}
							>
                <Grid>
                  <Grid item xs={12}>
										<Box
											sx={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											{" "}
											<GoMail className="auth-svg" />
											<Typography variant="h2">
												Enter Your Email
											</Typography>
										</Box>
										<StyledDivider />
									</Grid>
                  <Box
										sx={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											marginBottom: "20px",
										}}
									>
										<Typography
											variant="body1"
											component="div"
										>
											Are you sure you want to reset your
											password?
										</Typography>
									</Box>
                </Grid>
                {isLoading ? (
                  <Spinner />
                ): (
                  <Grid container>
                    {/* email */}
										<Grid item xs={12}>
											<Stack spacing={1}>
												<InputLabel htmlFor="email-signup">
													Email Address*
												</InputLabel>
												<OutlinedInput
													fullWidth
													error={Boolean(
														touched.email &&
															errors.email
													)}
													id="email-signup"
													type="email"
													value={values.email}
													name="email"
													onBlur={handleBlur}
													onChange={handleChange}
													placeholder="email@example.com"
													inputProps={{}}
												/>
												{touched.email &&
													errors.email && (
														<FormHelperText
															error
															id="helper-text-email-signup"
														>
															{errors.email}
														</FormHelperText>
													)}
											</Stack>
										</Grid>
                    {/* button */}
										<Grid item xs={12}>
											<Button
												sx={{ mt: 3, mb: 2 }}
												type="submit"
												fullWidth
												variant="contained"
												color="success"
												size="large"
												endIcon={<SendIcon />}
												disabled={!values.email}
											>
												Send Password Reset Email
											</Button>
										</Grid>
										{/* Go back button */}
										<Grid item xs={12}>
											<Button
												variant="contained"
												color="warning"
												size="medium"
												onClick={goBack}
											>
												Go Back
											</Button>
										</Grid>
                  </Grid>
                )}
              </form>
            </Container>
          </AuthWrapper>
        )}
      </Formik>
    </>
  )
}

export default PasswordResetRequestPage