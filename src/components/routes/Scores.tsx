import Menu from 'Container/base/Menu';
import React from 'react';
import { Link } from 'react-router-dom';

function Scores() {
  return (
    <Menu title="Scores">
      <Link to="/home" className="default-button text-center m-1">
        Back
      </Link>
    </Menu>
  );
}

export default Scores;
