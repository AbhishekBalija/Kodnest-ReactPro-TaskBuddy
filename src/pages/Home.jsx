import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = sessionStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks)); // Parse JSON safely
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      sessionStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks as JSON
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { text: task, status: "todo", id: Date.now() };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks); // Update state
      setTask(""); // Clear input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-400 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-pink-200 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-rubik-vinyl-regular text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8 text-center tracking-tight">
            Task Buddy
          </h1>

          <div className="flex gap-3">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What's on your mind today?"
              className="flex-1 px-6 py-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400 text-base"
            />

            <button
              onClick={handleAddTask}
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg shadow-purple-200"
            >
              <Plus size={24} />
              <span className="text-base">Add Task</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskCard
            type="todo"
            tasks={tasks.filter((task) => task.status === "todo")}
            onStatusChange={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
          <TaskCard
            type="ongoing"
            tasks={tasks.filter((task) => task.status === "ongoing")}
            onStatusChange={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
          <TaskCard
            type="completed"
            tasks={tasks.filter((task) => task.status === "completed")}
            onStatusChange={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
