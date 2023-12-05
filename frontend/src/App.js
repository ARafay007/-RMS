import {BrowserRouter as Router} from 'react-router-dom';
import { PrivateRoutes } from './privateRoutes';

function App() {
  return (
    <Router>
      <PrivateRoutes />
    </Router>
  );
}

export default App;
