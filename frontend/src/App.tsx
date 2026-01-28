import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Upload from './components/DataUpload';
import Filter from './components/TranscriptomicsFiltering';
import Dashboard from './components/PCADataDashboard'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
      <h2 className="logo">HDP Analysis</h2>
      <nav>
        <button className="nav-item active">
          <span className="nav-icon">📊</span>
          PCA
        </button>
      </nav>
    </aside>


     <Dashboard />
    </div>
  );
}

export default App;
