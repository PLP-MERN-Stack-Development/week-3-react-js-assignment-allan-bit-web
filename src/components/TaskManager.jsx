import { useLocalStorage } from "@/hooks/useLocalStorage";
import TaskDialog from "@/components/TaskDialog";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("all");

  const addTask = (task) => {
    const newTask = {
      ...task,
      _id: Date.now(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    toast.success("✅ Task added!");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    const deleted = tasks.find((t) => t._id === id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
    toast.error(`🗑️ "${deleted?.title}" deleted.`);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>

      <TaskDialog onSubmit={addTask} />

      {/* Filter Buttons */}
      <div className="flex gap-2 mt-4">
        {["all", "active", "completed"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <p className="text-sm text-zinc-500 mt-4">No tasks to show.</p>
        )}
      </div>
    </div>
  );
}
