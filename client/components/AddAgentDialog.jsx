'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { X, User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddAgentDialog = ({ isOpen, onClose, onSuccess, getToken }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const token = getToken();
            const res = await fetch(`${backend_url}/agent/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success('Agent added successfully!');
                setForm({ name: '', email: '', mobileNumber: '', password: '' });
                onSuccess();
                onClose();
            } else {
                setErrorMsg(data.message || 'Failed to add agent');
            }
        } catch (error) {
            console.error('Error adding agent:', error);
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setForm({ name: '', email: '', mobileNumber: '', password: '' });
            setErrorMsg('');
            setShowPassword(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">

                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#d6a676] to-[#bf8952] rounded-lg flex items-center justify-center">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Add New Agent</h2>
                            <p className="text-sm text-gray-500">Create a new agent account</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>


                <div className="p-6">
                    {/* Error Message */}
                    {errorMsg && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                            <span className="text-red-700 text-sm">{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Enter agent's full name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    placeholder="Enter 10-digit mobile number"
                                    value={form.mobileNumber}
                                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create password (min 6 characters)"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#d6a676] focus:border-transparent outline-none transition-all placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Password must be at least 6 characters long
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={loading}
                                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-[#d6a676]  text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        Add Agent
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAgentDialog;