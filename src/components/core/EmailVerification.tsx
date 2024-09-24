import type { AxiosResponse } from 'axios';
import type { FormikHelpers } from 'formik';
import type { IVerifyOtp } from 'src/types';

import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

import api from 'src/api';
import { verifyUser } from 'src/redux/auth.reducer';

import AnimateButton from './AnimateButton';
import { GradientCircularProgress } from './GradientCircularProgress';

// Types for EmailVerification props
interface EmailVerificationProps {
  email: string;
}

interface EmailFormValues {
  email: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email }: EmailFormValues) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [hashOtp, setHashOtp] = useState<string | null>(null);

  // Get OTP mutation
  const {
    mutate: getOtpMutation,
    isPending,
    reset,
  } = useMutation({
    mutationFn: (data: { email: string }) => api.User.GetOtpVerification(data),
    onSuccess: (res: AxiosResponse) => {
      const { message, data } = res.data;
      toast.success(message, { position: 'top-center' });
      setHashOtp(data.otp);
      reset();
    },
    onError: (e: any) => {
      toast.error(e.response.data.message, { position: 'top-center' });
    },
  });

  // Verify OTP mutation
  const {
    mutate: verifyOtp,
    isPending: isVerifyLoading,
    reset: verifyReset,
  } = useMutation({
    mutationFn: (payload: IVerifyOtp) => api.User.VerifyOtp(payload),
    onSuccess: (res: AxiosResponse) => {
      const { message, data } = res.data;
      dispatch(verifyUser(data));
      toast.success(message, { position: 'top-center' });
      verifyReset();
    },
    onError: (error: any) => {
      if (error.response.data.errorMessages.length > 0) {
        error.response.data.errorMessages.map(({ message }: { message: string }) =>
          setTimeout(() => {
            toast.error(message, { position: 'top-right' });
          }, 500)
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
        label {
            color: ${theme.palette.text.disabled};
        }
    `;

  return (
    <>
      <style>{css}</style>
      {hashOtp ? (
        <Formik
          initialValues={{
            otp: '',
            hash_otp: hashOtp,
          }}
          validationSchema={Yup.object().shape({
            otp: Yup.string().length(6, 'OTP must be exactly 6 digits').required('OTP is required'),
          })}
          onSubmit={(values: IVerifyOtp, { resetForm }: FormikHelpers<IVerifyOtp>) =>
            verifyOtp(
              { otp: values.otp, hash_otp: hashOtp },
              {
                onSuccess: () =>
                  resetForm({
                    values: {
                      otp: '',
                      hash_otp: '',
                    },
                  }),
              }
            )
          }
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.otp && errors.otp)}
                sx={{ ...theme.typography.body1 }}
              >
                <InputLabel htmlFor="otp">OTP</InputLabel>
                <OutlinedInput
                  id="otp"
                  value={values.otp}
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="OTP"
                  inputProps={{}}
                />
                {touched.otp && errors.otp && <FormHelperText error>{errors.otp}</FormHelperText>}
              </FormControl>
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isVerifyLoading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    {isVerifyLoading ? <GradientCircularProgress /> : 'Send'}
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            email,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
          })}
          onSubmit={(values: EmailFormValues, { resetForm }: FormikHelpers<EmailFormValues>) => {
            getOtpMutation(values, {
              onSuccess: () =>
                resetForm({
                  values: {
                    email,
                  },
                }),
            });
          }}
        >
          {({ handleSubmit, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <TextField value={values.email} aria-readonly fullWidth />
              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isPending}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    {isPending ? <GradientCircularProgress /> : 'Send'}
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EmailVerification;
