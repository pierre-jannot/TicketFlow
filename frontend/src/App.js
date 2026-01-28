import { GetTickets } from './components/Controller.js'

function App() {
  return (
    <div>
      <h1>Affichage des tickets</h1>
      <ul id="tickets"></ul>
      <GetTickets></GetTickets>
    </div>
  );
}

export default App;