import './App.css'
import {Index} from "./routes/Index.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {Toaster} from "sonner";

function App() {

    const isDark = document.documentElement.classList.contains('dark');

    return (
      <ThemeProvider>
          <Toaster
              position="top-right"
              theme="light"
              richColors={true}
              toastOptions={{
                  style: {
                      background: isDark ? '#101828' : 'white',
                      border: isDark? '1px solid #494949':'1px solid #C8C8C8',
                      color: isDark ? 'white' : 'black',
                      fontSize: '12px',
                      borderRadius: '8px',
                  },
              }}
          />
          <Index />
      </ThemeProvider>
  )
}

export default App
