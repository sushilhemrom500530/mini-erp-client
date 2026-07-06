import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaLock, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import FormField from "../../../Components/form/index.js";
import type { AppDispatch } from "../../../redux/store.js";
import { useLoginMutation } from "../../../redux/features/user/index.js";
import { setCredentials } from "../../../redux/userSlice.js";


interface LoginFormValues {
    email: string;
    password: string;
}

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            const res = await login(values).unwrap();

            dispatch(
                setCredentials({
                    user: res.data.user,
                    token: res.data.token,
                })
            );

            message.success(res.message);

            navigate(location.state?.from || "/dashboard", {
                replace: true,
            });
        } catch (error: any) {
            message.error(error?.data?.message || "Login failed");
        }
    };

    const handleGoogleLogin = () => {
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
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Login Card */}
            <div className="relative z-20 w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-3 text-4xl font-bold text-white">
                        Hello, Welcome!
                    </h1>

                    <p className="text-gray-300">
                        Please enter your details below to continue.
                    </p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Email
                            </label>

                            <FormField
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                icon={<FaUser className="mr-2 text-gray-500" />}
                                required
                                rules={[
                                    {
                                        type: "email",
                                        message: "Enter a valid email address.",
                                    },
                                ]}
                            />
                        </div>

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
                    </div>

                    <div className="mt-6 mb-8 flex items-center justify-between">
                        <Checkbox
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        >
                            <span className="text-gray-200">Remember me</span>
                        </Checkbox>

                        <Link
                            to="/auth/forgot-password"
                            className="text-sm font-semibold !text-secondary hover:!text-primary/80"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        loading={isLoading}
                        className="w-full !rounded-xl !bg-primary hover:!bg-primary/90 text-lg font-semibold shadow-md mb-6"
                    >
                        Sign In
                    </Button>

                    <div className="relative mb-6 flex items-center">
                        <div className="flex-1 border-t border-white/20"></div>

                        <span className="mx-4 text-sm text-gray-300">Or</span>

                        <div className="flex-1 border-t border-white/20"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 py-3 text-white transition-all hover:bg-secondary/10 cursor-pointer"
                    >
                        <FcGoogle size={22} />
                        Continue With Google
                    </button>

                    <div className="mt-8 text-center text-sm text-gray-300">
                        Don't have an account?{" "}
                        <Link
                            to="/auth/register"
                            className="font-semibold !text-secondary hover:!text-primary/80"
                        >
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}