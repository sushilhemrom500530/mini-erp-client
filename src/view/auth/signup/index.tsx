import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from "react-hook-form";
import { Button, Form, message } from 'antd';
import FormField from '../../../Components/form/index.js';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import type { IRegisterRequest } from '../../../types/user/index.js';
import { useRegisterMutation } from '../../../redux/features/user/index.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../redux/userSlice.js';
import type { AppDispatch } from '../../../redux/store.js';

export default function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const from = location.state?.from?.pathname || "/dashboard";

    const dispatch = useDispatch<AppDispatch>();

    const [registerUser, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IRegisterRequest>({
        defaultValues: {
            role: "employee",
        },
    });

    const onSubmit = async (data: IRegisterRequest) => {
        try {
            const res = await registerUser(data).unwrap();

            /**
             * Only dispatch credentials if your backend
             * returns user information after registration.
             *
             * Otherwise remove this block.
             */
            if (res.data?.user && res.data?.token) {
                dispatch(
                    setCredentials({
                        user: res.data.user,
                        token: res.data.token,
                    })
                );
            }

            message.success(res.message);

            navigate(from, {
                replace: true,
            });
        } catch (error: any) {
            message.error(
                error?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = `${import.meta.env.VITE_PUBLIC_URL}/auth/google`;
    };


    return (
        <div
            className="relative flex min-h-screen items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat px-4 py-10"
            style={{
                backgroundImage: "url('/image/register.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Register Card */}
            <div className="relative z-20 w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-300">
                        Fill in your details below to create your account.
                    </p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <div className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Full Name
                            </label>

                            <FormField
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                icon={<FaUser className="mr-2 text-gray-500" />}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Email
                            </label>

                            <FormField
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                icon={<MdMail className="mr-2 text-gray-500" />}
                                required
                                rules={[
                                    {
                                        type: "email",
                                        message: "Enter a valid email address.",
                                    },
                                ]}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Password
                            </label>

                            <FormField
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                icon={<FaLock className="mr-2 text-gray-500" />}
                                required
                                rules={[
                                    {
                                        min: 6,
                                        message: "Password must be at least 6 characters.",
                                    },
                                ]}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Role
                            </label>
                            <FormField
                                name="role"
                                type="select"
                                placeholder="Select your role"
                                icon={<FaLock className="mr-2 text-gray-500" />}
                                required
                                options={[
                                    { value: "admin", label: "Admin" },
                                    { value: "manager", label: "Manager" },
                                    { value: "employee", label: "Employee" },
                                ]}
                            />
                        </div>
                    </div>

                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        loading={isLoading}
                        className="mt-8 w-full !rounded-xl !bg-primary hover:!bg-primary/90 text-lg font-semibold shadow-md"
                    >
                        Create Account
                    </Button>

                    <div className="relative my-6 flex items-center">
                        <div className="flex-1 border-t border-white/20"></div>

                        <span className="mx-4 text-sm text-gray-300">
                            Or
                        </span>

                        <div className="flex-1 border-t border-white/20"></div>
                    </div>

                    <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/20 py-3 text-white transition hover:bg-secondary/10"
                    >
                        <FcGoogle size={22} />
                        Continue With Google
                    </button>

                    <div className="mt-8 text-center text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="font-semibold !text-secondary hover:!text-primary/80"
                        >
                            Sign In
                        </Link>
                    </div>
                </Form>
            </div >
        </div >
    )
}

