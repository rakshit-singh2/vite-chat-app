import { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from "../../components/hook-form/FormProvider";
import { Stack, Alert, InputAdornment, IconButton, Link, Button } from "@mui/material";
import RHFTextField from '../../components/hook-form/RHFTextField';
import { Eye, EyeSlash } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';


const RegisterForm = () => {

    const dispatch = useDispatch();

    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Email must be valid email address."),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "demo@text2them.com",
        password: "demo1234"
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(RegisterUser(data));
        }
        catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.messasge,
            })
        }
    };

    return (
        <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                spacing={3}
                direction={"column"}
            >
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                >
                    <RHFTextField name={"firstName"} label="First Name" />
                    <RHFTextField name={"lastName"} label="Last Name" />
                </Stack>

                <RHFTextField name={"email"} label="Email" />
                <RHFTextField
                    name={"password"}
                    label={"Password"}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => {
                                    setShowPassword(!showPassword);
                                }}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    fullWidth
                    color='inherit'
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{
                        bgcolor: 'text.primary',
                        color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
                        '&:hover': {
                            bgcolor: "text.primary",
                            color: (theme) => theme.palette.mode === 'light' ? "common.white" : "grey.800",
                        }
                    }}
                >
                    Create Account
                </Button>
            </Stack>

        </FormProvider>
    )
}

export default RegisterForm