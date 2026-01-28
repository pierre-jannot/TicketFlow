import './App.css'
import { GetTickets } from './components/Controller.js'

function App() {
  return (
    <div>
      <h1>Affichage des tickets</h1>
      <p class="legend">
        <strong>Priorités : </strong>
        <span class="legend-green">Basse</span>
        <span class="legend-yellow">Moyenne</span>
        <span class="legend-red">Haute</span>
      </p>
      <ul id="tickets"></ul>
      <GetTickets></GetTickets>
    </div>
  );
}

export default App;