

"use client";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, ClipboardList, Calendar, ArrowRight } from "lucide-react";

const AgentCard = ({ agent }) => {
    const router = useRouter();
    const handleClick = (agentId) => () => {
        router.push(`/agent/${agentId}`);
    };

    return (
        <div
            key={agent._id}
            className="bg-white shadow-xs rounded-lg p-6 border border-[#f0eae2] hover:shadow-sm  transition-all duration-300 group cursor-pointer"
            onClick={handleClick(agent._id)}
        >
            {/* Header with Avatar */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#d6a676] rounded-full flex items-center justify-center shadow-sm">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#bf8952] transition-colors">
                            {agent.name}
                        </h2>
                        <div className="flex items-center text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1.5" />
                            <span className="text-sm">
                                Joined {new Date(agent.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#bf8952] group-hover:translate-x-1 transition-all" />
            </div>


            <div className="space-y-3 mb-4 ml-2">
                <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{agent.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{agent.mobileNumber}</span>
                </div>
            </div>


            <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                    <ClipboardList className="w-4 h-4 mr-2 text-[#bf8952]" />
                    <span className="text-sm font-medium text-gray-700">
                        {agent.taskCount} {agent.taskCount === 1 ? 'Task' : 'Tasks'}
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick(agent._id)();
                    }}
                    className="bg-[#d6a676] hover:bg-[#bf8952] text-white px-2 py-1 rounded-md font-md hover:shadow-sm hover:scale-101 transition-all duration-200 flex items-center space-x-2"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default AgentCard;