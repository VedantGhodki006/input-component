import Image from "next/image";
import App from "./components/inputbox";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <App />
    </div>
  );
}
