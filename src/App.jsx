import "./App.css";
import Analytics from "./components/Analytics";
import Builds from "./components/Builds";

function App() {
  return (
    <div className="app flex flex-col bg-gray-200 w-full h-full">
      <div className="content m-3 flex flex-col gap-15">
        <Analytics />
        <Builds />
      </div>
    </div>
  );
}

export default App;
