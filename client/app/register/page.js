
"use client";
import { useState, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
const backend_url= process.env.NEXT_PUBLIC_BACKEND_URL;
export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.replace('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const res = await fetch(`${backend_url}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMsg("You are registered! Go to login page.");
                setForm({ name: "", email: "", password: "" });
            } else {
                setErrorMsg(data.message || "Registration failed");
            }
        } catch (err) {
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">Create Account</h1>
                    <p className="text-gray-500">Join the Agent Management System</p>
                </div>


                <div className="bg-white rounded-lg shadow-sm p-8 border border-[#f0eae2]">
                    <div className="flex items-center justify-center mb-6">
                        <UserPlus className="w-6 h-6 text-[#bf8952] mr-2" />
                        <h2 className="text-2xl font-semibold text-gray-700">Sign Up</h2>
                    </div>

                    {/* Success Message */}
                    {successMsg && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                            <span className="text-green-700 text-sm">{successMsg}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMsg && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                            <span className="text-red-700 text-sm">{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d6a676]  text-white py-3 rounded-md font-semibold hover:shadow-md hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-[#bf8952] hover:underline font-medium"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
