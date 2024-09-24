import { useState, useRef, useEffect } from 'react';
import {
  Slide,
  Typography,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import { Formik, type FormikProps, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MdSend } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import auth from 'src/api/auth';
import AnimateButton from '../core/AnimateButton';
import CustomGlobalModal from '../core/CustomGlobalModal';
import { GradientCircularProgress } from '../core/GradientCircularProgress';

// Define the form values type
interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

export default function ForgotPasswordModal({ open, setOpen }: ForgotPasswordModalProps) {
  const theme = useTheme();
  const containerRef = useRef<HTMLElement>(null);

  const handleClose = () => setOpen(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ForgotPasswordFormValues) =>
      auth.Authentication.GetResetPasswordLink(payload),
    onSuccess: (response) => {
      const { message } = response.data;
      toast.success(message, { position: 'top-right' });
      handleClose();
    },
    onError: (error: any) => {
      const errorMessages = error.response?.data?.errorMessages || [];
      errorMessages.forEach(({ msg }: { msg: string }) => {
        setTimeout(() => {
          toast.error(msg, { position: 'top-right' });
        }, 500);
      });
    },
  });

  const handleForgotPassword = (
    values: ForgotPasswordFormValues,
    actions: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    mutate(values);
    actions.setSubmitting(false);
  };

  return (
    <CustomGlobalModal open={open} handleClose={handleClose}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
          padding: 6,
          borderRadius: 3,
          position: 'relative',
        }}
      >
        {/* Slide component for enter/exit animation */}
        <Box
          ref={containerRef}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            paddingTop: 1,
            position: 'absolute',
            top: -18,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            left: '50%',
            transform: 'translate(-50%, 0)',
            transition: 'all ease-in-out 0.5s',
            zIndex: 999,
          }}
        >
          <Slide in={open} direction="down" mountOnEnter unmountOnExit>
            <Typography color={theme.palette.text.disabled} variant="overline">
              Enter your email
            </Typography>
          </Slide>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
          })}
          onSubmit={handleForgotPassword}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            isSubmitting,
          }: FormikProps<ForgotPasswordFormValues>) => (
            <form
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
              noValidate
              onSubmit={handleSubmit}
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
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>

              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isPending || isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  endIcon={!isPending && <MdSend />}
                  color="secondary"
                >
                  {isPending && <GradientCircularProgress />}
                </Button>
              </AnimateButton>
            </form>
          )}
        </Formik>
      </Box>
    </CustomGlobalModal>
  );
}
