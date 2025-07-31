
"use client";
import { useEffect, useState } from 'react';
import TaskCard from '@/components/TaskCard';
import Loader from '@/components/Loader';
import {
    User,
    Mail,
    Phone,
    ClipboardList,
    CheckCircle,
    Clock,

    ArrowLeft,
    Activity,
    TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AgentDetailsPage({ params }) {
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const agentId = params.id;
   // get token for autherization  
    const getToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        const token = getToken();
        const fetchAgent = async () => {
            try {
                const res = await fetch(`${backend_url}/agent/${agentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log(data);
                if (data.success) {
                    setAgent(data.data);
                }
            } catch (err) {
                console.error("Error fetching agent:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [agentId]);

    if (loading) return <Loader message="Loading agent details..." />;

    if (!agent) {
        return (
            <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Agent not found</h3>
                <p className="text-gray-500 mb-6">The agent you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-[#d6a676] to-[#bf8952] text-white px-6 py-2 rounded-lg hover:shadow-md transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }


    const totalTasks = agent.tasks?.length || 0;
    const completedTasks = agent.tasks?.filter(task => task.status?.toLowerCase() === 'completed').length || 0;
    const pendingTasks = agent.tasks?.filter(task => task.status?.toLowerCase() === 'pending').length || 0;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="space-y-8 pt-4 pb-30">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-[#bf8952] transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium">Back</span>
            </button>


            <div >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20  bg-gradient-to-br from-[#d6a676] to-[#bf8952] rounded-full flex items-center justify-center backdrop-blur-sm">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{agent.name}</h1>
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>{agent.email}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>{agent.mobileNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-0">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Activity className="w-5 h-5" />
                            <span className="text-sm font-medium">Agent Profile</span>
                        </div>
                        <div className="mt-2 text-right">
                            <p className="text-sm text-gray-600">
                                Member since : {new Date(agent.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-md p-6 shadow-sm border border-[#f0eae2]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Tasks</p>
                            <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <ClipboardList className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-md p-6 shadow-sm border border-[#f0eae2]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Completed</p>
                            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-md p-6 shadow-sm border border-[#f0eae2]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-md p-6 shadow-sm border border-[#f0eae2]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Success Rate</p>
                            <p className="text-3xl font-bold text-purple-600">{completionRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="">
                <div className="flex items-center justify-between mb-8 border-b border-[#f0eae2] pb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Assigned Tasks</h2>
                    <span className="text-sm text-gray-500">
                        {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} total
                    </span>
                </div>

                {totalTasks > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agent.tasks.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClipboardList className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks assigned</h3>
                        <p className="text-gray-500 mb-6">
                            This agent doesn't have any tasks assigned yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}