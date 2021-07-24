import React from 'react';

interface Props {
  title: string;
}

function MenuLabel(props: Props) {
  const { title } = props;

  return (
    <div className="bg-gray-900 bg-opacity-50 text-gray-300 shadow-md text-4xl font-semibold p-2 m-3 min-w-1/2">
      {title}
    </div>
  );
}

export default MenuLabel;
