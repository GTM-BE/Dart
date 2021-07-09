import Menu from 'Container/base/Menu';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Menu title="Dart">
      <Link to="/game_screen" className="default-button text-center m-1">
        New Game
      </Link>
      <Link to="/scores" className="default-button text-center m-1">
        Scores
      </Link>
    </Menu>
  );
}

export default Home;
