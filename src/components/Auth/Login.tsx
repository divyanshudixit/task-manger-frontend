import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { RouterLink } from '../../routes';
import { useBoolean } from '../../hooks/use-boolean';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { login } from '../../services/authService';
import { setItemInStorage, KEY_ACCESS_TOKEN, KEY_USER } from '../../utils/storage-helper';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function AmplifyLoginView() {
  const navigate = useNavigate();  
  const [errorMsg, setErrorMsg] = useState<string>('');
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').email('Username must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues: LoginFormInputs = {
    username: '',
    password: '',
  };

  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, formState: { isSubmitting } } = methods;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Form data", data);
    try {
      const { token ,user} = await login(data.username, data.password);
      console.log("Token", token);
      setItemInStorage(KEY_ACCESS_TOKEN, JSON.stringify(token));
      setItemInStorage(KEY_USER, JSON.stringify(user));
      navigate('/dashboard');  
    } catch (error) {
      console.error("Login error", error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : (error as Error).message);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to App</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>
        <Link component={RouterLink} href={'/register'} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="username" label="Username" />
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'black',
          },
        }}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
