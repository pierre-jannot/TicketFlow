import './App.css'
import { TicketList } from './components/TicketList.js'

function App() {
  return (
    <div>
      <h1>Portail des tickets</h1>
      <p className="legend">
        <strong>Priorités : </strong>
        <span className="legend-green">Basse</span>
        <span className="legend-yellow">Moyenne</span>
        <span className="legend-red">Haute</span>
      </p>
      <TicketList></TicketList>
    </div>
  );
}

export default App;