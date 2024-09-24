import type { FormEvent } from 'react';

import * as Yup from 'yup';
// third party
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project imports

import type { AxiosResponse } from 'axios';
import type { IResetPassword } from 'src/types';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiExternalLink } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useSelector } from 'react-redux';

// assets
import { Divider } from '@mui/material';

import { strengthColor, strengthIndicator } from 'src/utils/password-strength';

import auth from 'src/api/auth';
import { selectCurrentMode } from 'src/redux/selector';

import AnimateButton from '../core/AnimateButton';
import { GradientCircularProgress } from '../core/GradientCircularProgress';

/**
 * @summary Reset password
 * @returns {import('react').ReactNode}
 */
const ResetPassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const customization = useSelector(selectCurrentMode);
  const [searchParams] = useSearchParams('');

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({
    label: '',
    color: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: FormEvent) => {
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

  useEffect(() => {
    if (!searchParams.get('token')) {
      navigate('/auth/login', {
        replace: true,
      });
    }
  }, [navigate, searchParams]);

  // sign-up mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: IResetPassword) => auth.Authentication.ForgotPasswordChange(payload),
    onSuccess: (res: AxiosResponse) => {
      const { message, links } = res.data;
      toast.success(message, {
        position: 'top-center',
      });
      navigate(links.login, {
        replace: true,
      });
    },
    onError: (error: any) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }: { message: string }, i: number) =>
          setTimeout(() => {
            toast.error(message, { position: 'top-right' });
          }, 1000 + i)
        );
      } else {
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    },
  });

  const css = `
  .hover\\:text-underline:hover {
  text-decoration: underline;
}
  
    label{
    color: ${theme.palette.text.disabled}
}

  `;

  return (
    <>
      <style>{css}</style>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} />

        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography
              color={
                customization.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
              }
              variant="subtitle1"
            >
              Reset Your Password
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm password is required'),
        })}
        onSubmit={(v) =>
          mutate({
            password: v.password,
            confirmPassword: v.confirmPassword,
            token: searchParams.get('token') as string,
          })
        }
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.body1 }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="New Password"
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
                inputProps={{}}
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
                Re-enter Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword-register"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                label="Re-enter Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
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
                      <Typography
                        color={
                          customization.mode === 'dark'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100]
                        }
                        variant="subtitle1"
                        fontSize="0.75rem"
                      >
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
                    <Typography
                      variant="subtitle1"
                      color={
                        customization.mode === 'dark'
                          ? theme.palette.grey[900]
                          : theme.palette.grey[100]
                      }
                    >
                      Agree with &nbsp;
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to="/terms-conditions"
                        color={
                          customization.mode === 'dark'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100]
                        }
                      >
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
                  disabled={isPending || !checked}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  {isPending ? <GradientCircularProgress /> : 'Submit'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box margin={1} />
        <Divider />
        <Box margin={1} />
        <Grid item container direction="column" alignItems="center" xs={12}>
          <Typography
            className="hover:text-underline"
            component={Link}
            to="/auth/login"
            variant="subtitle1"
            sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            color={
              customization.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
            }
          >
            {`Login `} <HiExternalLink />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
