import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from 'Routes/Home';
import NewGame from 'Routes/GameScreen';
import Scores from 'Routes/Scores';

import '../assets/main.css';
import '../assets/tailwind.css';
import Game from 'Routes/Game';

const App: React.FC = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-800 default-text">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/game_screen" exact>
            <NewGame />
          </Route>
          <Route path="/game_:baseScore">
            <Game />
          </Route>
          <Route path="/scores" exact>
            <Scores />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
