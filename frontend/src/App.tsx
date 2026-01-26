import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Upload from './components/DataUpload';
import Filter from './components/TranscriptomicsFiltering';
import Dashboard from './components/PCADataDashboard'

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
