// third party
import type { FormikHelpers } from 'formik';

import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports

import { useSelector } from 'react-redux';
// assets
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Divider, FormControlLabel, FormHelperText } from '@mui/material';

import { strengthColor, strengthIndicator } from 'src/utils/password-strength';

import AnimateButton from 'src/components/core/AnimateButton';
import { GradientCircularProgress } from 'src/components/core/GradientCircularProgress';
import { useRouter } from 'src/routes/hooks';

// TypeScript interfaces for form values and redux state
interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface VerifyOtpValues {
  otp: string;
  hashOtp: string;
}

interface CustomizationState {
  mode: 'dark' | 'light';
}

// ===========================|| AUTH ||=========================== //

const SignUpView = ({ ...others }) => {
    const theme = useTheme();
    const router = useRouter();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [otpView, setOtpView] = useState(false);
  const customization = useSelector(
    (state: { customization: CustomizationState }) => state.customization
  );

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<{ color: string; label: string } | undefined>();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('123456');
  }, []);

  const handleSignUp = (values: SignUpFormValues, resetForm: Function) => {
    console.log(values);
      setOtpView(true);
    resetForm();
      
  };

  const handleVerifyOtp = (values: VerifyOtpValues) => {
    console.log(values);
      if (document.getElementById('sign-up')) {
        document.getElementById('sign-up')!.style.display = 'none';
        document.getElementById('sign-in')!.style.display = 'block';
      } else {
          document.getElementById('sign-up')!.style.display = 'block';
          document.getElementById('sign-in')!.style.display = 'none';
      }
      router.push("/");
  };

  const css = `
        .hover\\:text-underline:hover {
            text-decoration: underline;
        }
  
        label{
            color: ${theme.palette.text.disabled};
        }
    `;

  return (
    <>
      <style>{css}</style>
      <div id="sign-up">
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12} container alignItems="center" justifyContent="center">
            <Box sx={{ mb: 2 }}>
              <Typography
                color={
                  customization.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
                }
                variant="subtitle1"
              >
                {otpView ? 'Verify OTP' : 'Sign up with Email address'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {otpView ? (
          <Formik
            initialValues={{
              otp: '',
              hashOtp: '',
            }}
            validationSchema={Yup.object().shape({
              otp: Yup.string()
                .length(6, 'OTP must be exactly 6 digits')
                .required('OTP is required'),
            })}
            onSubmit={(
              values: VerifyOtpValues,
              { setSubmitting }: FormikHelpers<VerifyOtpValues>
            ) => handleVerifyOtp(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isSubmitting: isOtpSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit} {...others}>
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.otp && errors.otp)}
                      sx={{ ...theme.typography.body1 }}
                    >
                      <InputLabel htmlFor="otp-verify">OTP</InputLabel>
                      <OutlinedInput
                        id="otp-verify"
                        type="text"
                        value={values.otp}
                        name="otp"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.otp && errors.otp && (
                        <FormHelperText error>{errors.otp}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isOtpSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      startIcon={
                        isOtpSubmitting && (
                          <GradientCircularProgress
                            size={25}
                            styles={{ marginLeft: '10px', color: 'white' }}
                          />
                        )
                      }
                    >
                      Send
                    </Button>
                  </AnimateButton>
                </Box>

                <Divider sx={{ my: 2 }} />
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required('First name is required'),
              lastName: Yup.string().required('Last name is required'),
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Passwords must match')
                .required('Confirm password is required'),
            })}
            onSubmit={(
              values: SignUpFormValues,
              { setSubmitting, resetForm }: FormikHelpers<SignUpFormValues>
            ) => {
              handleSignUp(values, resetForm);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              isSubmitting,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                {...others}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <Grid container spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={matchDownSM ? 12 : 6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                      sx={{ ...theme.typography.body1 }}
                    >
                      <InputLabel htmlFor="outlined-adornment-firstName-register">
                        First Name
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-firstName-register"
                        type="text"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={matchDownSM ? 12 : 6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                      sx={{ ...theme.typography.body1 }}
                    >
                      <InputLabel htmlFor="outlined-adornment-lastName-register">
                        Last Name
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-lastName-register"
                        type="text"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ ...theme.typography.body1 }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  sx={{ ...theme.typography.body1 }}
                >
                  <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  sx={{ ...theme.typography.body1 }}
                >
                  <InputLabel htmlFor="outlined-adornment-confirmPassword-register">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirmPassword-register"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirmPassword visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-confirmPassword-register">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>

                {strength !== 0 && (
                  <FormControl fullWidth>
                    <Box sx={{ mb: 2 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Box
                            style={{ backgroundColor: level?.color }}
                            sx={{ width: 85, height: 8, borderRadius: '7px' }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                            {level?.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </FormControl>
                )}

                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="subtitle1">
                          Agree with &nbsp;
                          <Typography variant="subtitle1" component={Link} to="#">
                            Terms & Condition.
                          </Typography>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      startIcon={
                        isSubmitting && (
                          <GradientCircularProgress
                            size={25}
                            styles={{ marginLeft: '10px', color: 'white' }}
                          />
                        )
                      }
                    >
                      Sign up
                    </Button>
                  </AnimateButton>
                </Box>

                <Divider sx={{ my: 2 }} />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default SignUpView;
