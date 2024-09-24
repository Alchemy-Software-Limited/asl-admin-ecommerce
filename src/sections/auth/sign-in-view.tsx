import type { FormEvent } from 'react';

import { useCallback, useState } from 'react';
import * as Yup from 'yup';
// third party
import { Form, Formik, type FormikProps } from 'formik';
// assets
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
// project imports

import Box from '@mui/material/Box';
// material-ui
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import { login } from 'redux/auth.reducer';
import { useRouter } from 'src/routes/hooks';

import AnimateButton from 'src/components/core/AnimateButton';
import { Iconify } from 'src/components/iconify';
import ForgotPasswordModal from 'src/components/auth/ForgotPasswordModal';
import SignUpView from './sign-up-view';

// ----------------------------------------------------------------------

// Shape of form values
interface FormValues {
  rememberMe: boolean;
  email: string;
  password: string;
}

const SignInView = () => {
  const router = useRouter();

  const initialModalState = {
    forgotPasswordModal: false,
  };
  const [modalState, setModalState] = useState(initialModalState);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [checked, setChecked] = useState(false);

  // handle modal state
  const handdleModalOpen = (key: string, value: boolean) => {
    setModalState({
      ...modalState,
      [key]: value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderSignInForm = (
    <Formik
      initialValues={{
        email: 'admin@gmail.com',
        password: 'admin1234',
        rememberMe: checked,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
        rememberMe: Yup.boolean().optional(),
      })}
      onSubmit={handleSignIn}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setFieldValue,
      }: FormikProps<FormValues>) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address"
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
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
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberMe}
                  onChange={(event) => {
                    setFieldValue('rememberMe', event.target.checked);
                    setChecked(event.target.checked);
                  }}
                  name="rememberMe"
                  color="primary"
                />
              }
              label={<span>Remember me</span>}
            />
            <Link
              component="button"
              onClick={() => handdleModalOpen('forgotPasswordModal', true)}
              variant="body2"
            >
              Forgot Password?
            </Link>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                // disabled={isLoginLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {/* {isLoginLoading ? <GradientCircularProgress /> : 'Sign in'} */}
                Sign In
              </Button>
            </AnimateButton>
          </Box>
        </Form>
      )}
    </Formik>
  );



  return (
    <div id="sign-in">
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          {showSignUp ? 'Already having an account?' : 'Don’t have an account?'}
          <Link
            onClick={() => (showSignUp ? setShowSignUp(false) : setShowSignUp(true))}
            sx={{ ml: 0.5, cursor: 'pointer' }}
          >
            {showSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
        </Typography>
      </Box>

      {showSignUp ? <SignUpView /> : renderSignInForm}

      <ForgotPasswordModal
        open={modalState.forgotPasswordModal}
        setOpen={(value: boolean) => handdleModalOpen('forgotPasswordModal', value)}
      />

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:facebook-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </div>
  );
};

export default SignInView;
