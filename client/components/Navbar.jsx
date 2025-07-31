"use client";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, Shield, User } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-xs border-b border-[#f0eae2] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-5 flex items-center justify-between">

            <Link href="/" className="group">
                <div className="flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-[#bf8952] group-hover:text-[#d6a676] transition-colors" />
                    <span className="text-xl font-bold text-gray-800 group-hover:text-[#bf8952] transition-colors">
                        Agent Manager
                    </span>
                </div>
            </Link>


            <div className="flex items-center space-x-4">
                {user ? (
                    <div className="flex items-center space-x-3">

                        <div className="flex items-center justify-center w-8 h-8 bg-[#d6a676]  text-white rounded-full font-semibold text-sm">
                            {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                        </div>


                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-red-100 text-red-500 px-4 py-1 rounded-md border border-red-200 hover:bg-red-200 hover:shadow-md transition-all duration-200 font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">

                        <Link href="/register" className="hidden sm:block">
                            <span className="text-[#bf8952] hover:text-[#d6a676] font-medium transition-colors cursor-pointer">
                                Register
                            </span>
                        </Link>


                        <Link href="/login">
                            <button className="flex items-center space-x-2 bg-blue-100 border border-blue-200 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200 font-medium">
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;