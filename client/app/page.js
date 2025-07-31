'use client';
import { useEffect, useState } from 'react';
import AgentCard from '@/components/AgentCard';
import CsvUploadDialog from '@/components/CsvUploadDialog';
import AddAgentDialog from '@/components/AddAgentDialog';
import Loader from '@/components/Loader';
import ProtectedRoute from '@/components/ProtectedRoute';
import { toast } from 'react-hot-toast';
import {
  Users,
  ClipboardList,
  Plus,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useRouter} from "next/navigation";
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAgents, setTotalAgents] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
 const router = useRouter();


  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchAgents = async () => {
    try {
      const token = getToken();
      const res = await fetch(`${backend_url}/agent/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setAgents(data.data);
        const totalAgents = data.data.length;
        setTotalAgents(totalAgents);
        const totalTasks = data.data.reduce((acc, agent) => acc + agent.taskCount, 0);
        setTotalTasks(totalTasks);
      } else {
        console.error('Failed to fetch agents');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleUploadSuccess = () => {
    toast.success('Tasks uploaded successfully');
    fetchAgents();
  };


  const avgTasksPerAgent = totalAgents > 0 ? (totalTasks / totalAgents).toFixed(1) : 0;

  if (loading) return <Loader message="Loading agents..." />;

  return (
    <ProtectedRoute>
    <div className="space-y-8 pt-4 pb-30">

      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-gray-800 text-xl md:text-2xl font-bold mb-1">Agent Dashboard</h1>
            <p className="text-gray-500 text-md">Manage and monitor your agent network</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">Live Dashboard</span>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-md p-6 shadow-xs border border-[#f0eae2] hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Agents</p>
              <p className="text-3xl font-bold text-gray-900">{totalAgents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Active network</span>
          </div>
        </div>

        <div className="bg-white rounded-md p-6 shadow-xs border border-[#f0eae2] hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>All assignments</span>
          </div>
        </div>

        <div className="bg-white rounded-md p-6 shadow-xs border border-[#f0eae2] hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Avg Tasks/Agent</p>
              <p className="text-3xl font-bold text-gray-900">{avgTasksPerAgent}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Performance metric</span>
          </div>
        </div>
      </div>


      <div className="">
        <div className="flex items-center justify-between border-b border-[#f0eae2] pb-4 ">
          <h2 className="text-xl font-semibold text-gray-800">All Agents</h2>
          <span className="text-sm text-gray-600">
            {totalAgents} {totalAgents === 1 ? 'agent' : 'agents'} total
          </span>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <AgentCard key={agent._id} agent={agent} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No agents yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by uploading your first batch of tasks
            </p>
          </div>
        )}
      </div>


      {/* Agent Upload Button */}
      <div className="fixed bottom-17 right-8 flex items-center gap-2 z-50">

        <div className="relative bg-white text-purple-400 px-3 py-1 rounded-md shadow-md text-sm">
          Add Agent
        </div>
        <button
          onClick={() => setAgentDialogOpen(true)}
          className="w-14 h-14 bg-purple-400 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
          title="Upload CSV Tasks"
        >
          <Plus className="w-6 h-6" />
        </button>

      </div>
      <AddAgentDialog
        isOpen={agentDialogOpen}
        onClose={() => setAgentDialogOpen(false)}
        onSuccess={fetchAgents}
        getToken={getToken}
      />

      {/* Task Upload Button */}
      <div className="fixed bottom-8 right-8 flex items-center gap-2 z-50">

        <div className="relative bg-white text-blue-400 px-3 py-1 rounded-md shadow-md text-sm">
          Upload Tasks
        </div>

        <button
          onClick={() => setIsTaskDialogOpen(true)}
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
          title="Upload CSV Tasks"
        >
          <Plus className="w-6 h-6" />
        </button>

      </div>


      <CsvUploadDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        onSuccess={handleUploadSuccess}
        getToken={getToken}
      />
    </div>
  </ProtectedRoute>

  );
}








