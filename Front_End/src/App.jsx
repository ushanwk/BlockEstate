import './App.css'
import {Index} from "./routes/Index.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <ThemeProvider>

          <Index />

      </ThemeProvider>
  )
}

export default App
