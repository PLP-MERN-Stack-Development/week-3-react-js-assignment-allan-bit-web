import Navbar from "@/components/Navbar";
import TaskManager from "@/components/TaskManager";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-4 sm:px-6 lg:px-8">
        <Navbar />
        <main className="max-w-3xl mx-auto py-4">
            <TaskManager/>
        </main>
       <Footer />
</div>

  );
}
