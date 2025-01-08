import {
  CheckCircle,
  Clock,
  ListTodo,
  ChevronRight,
  ChevronLeft,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const TaskCard = ({ type, tasks, onStatusChange, onDeleteTask }) => {
  const [animatingTaskId, setAnimatingTaskId] = useState(null);

  const cardConfig = {
    todo: {
      title: "To Do",
      icon: ListTodo,
      bgColor: "bg-blue-200",
      iconColor: "text-blue-600",
      nextStatus: "ongoing",
      prevStatus: null,
    },
    ongoing: {
      title: "Ongoing",
      icon: Clock,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      nextStatus: "completed",
      prevStatus: "todo",
    },
    completed: {
      title: "Completed",
      icon: CheckCircle,
      bgColor: "bg-green-200",
      iconColor: "text-green-600",
      nextStatus: null,
      prevStatus: "ongoing",
    },
  };

  const handleStatusChange = (taskId, newStatus) => {
    setAnimatingTaskId(taskId);
    setTimeout(() => {
      onStatusChange(taskId, newStatus);
      setAnimatingTaskId(null);
    }, 300);
  };

  const handleDelete = (taskId) => {
    setAnimatingTaskId(taskId);
    setTimeout(() => {
      onDeleteTask(taskId);
      setAnimatingTaskId(null);
    }, 300);
  };

  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} p-6 rounded-xl shadow-lg font-sans`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className={config.iconColor} size={24} />
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          {config.title}
        </h2>
        <span className="ml-auto bg-white/30 px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group 
              ${
                animatingTaskId === task.id
                  ? "scale-95 opacity-50"
                  : "scale-100 opacity-100"
              }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-base font-normal">{task.text}</p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity items-center">
                {config.prevStatus && (
                  <button
                    onClick={() =>
                      handleStatusChange(task.id, config.prevStatus)
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    title={`Move to ${cardConfig[config.prevStatus].title}`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                {config.nextStatus && (
                  <button
                    onClick={() =>
                      handleStatusChange(task.id, config.nextStatus)
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    title={`Move to ${cardConfig[config.nextStatus].title}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
                <div className="w-px h-4 bg-gray-200 mx-1" /> {/* Divider */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-1.5 hover:bg-red-50 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-base font-normal">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
