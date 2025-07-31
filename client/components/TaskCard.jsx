


import { User, Phone, FileText, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";

const TaskCard = ({ task }) => {
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return {
                    color: 'text-green-700',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    icon: CheckCircle,
                    iconColor: 'text-green-600'
                };
            case 'pending':
                return {
                    color: 'text-yellow-700',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-200',
                    icon: Clock,
                    iconColor: 'text-yellow-600'
                };
            case 'in-progress':
                return {
                    color: 'text-blue-700',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    icon: AlertCircle,
                    iconColor: 'text-blue-600'
                };
            default:
                return {
                    color: 'text-gray-700',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    icon: AlertCircle,
                    iconColor: 'text-gray-600'
                };
        }
    };

    const statusConfig = getStatusConfig(task.status);
    const StatusIcon = statusConfig.icon;

    return (
        <div
            key={task._id}
            className="bg-white rounded-md p-6 shadow-xs border border-[#f0eae2] hover:shadow-md transition-all duration-300 group"
        >

            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#d6a676] to-[#bf8952] rounded-full flex items-center justify-center shadow-sm">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#bf8952] transition-colors">
                            {task.firstName}
                        </h3>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor}`}>
                    <StatusIcon className={`w-3 h-3 mr-1.5 ${statusConfig.iconColor}`} />
                    <span className="capitalize">{task.status || 'Unknown'}</span>
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm font-medium">{task.phone}</span>
                </div>

                {task.notes && (
                    <div className="flex items-start text-gray-600">
                        <FileText className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm leading-relaxed">
                                {task.notes.length > 100
                                    ? `${task.notes.substring(0, 100)}...`
                                    : task.notes
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer with Creation Date */}
            <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">
                        Assigned : {new Date(task.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;