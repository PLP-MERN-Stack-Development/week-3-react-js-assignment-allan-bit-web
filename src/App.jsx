import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner"; // or relative import
// import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div>
      <Home />
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
