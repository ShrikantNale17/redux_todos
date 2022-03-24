import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Todos from './components/features/todo/Todos';

function App() {
  return (
    <div className="container">
      <div className="mx-auto">
        <Todos />
      </div>
      <ToastContainer
        theme='colored'
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
