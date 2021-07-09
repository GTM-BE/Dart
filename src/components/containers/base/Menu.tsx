import React from 'react';

interface Props {
  title: string;
  subTitle?: string;
  children?: JSX.Element[] | JSX.Element | string;
}

function Menu(props: Props) {
  const { title, subTitle = ' ', children } = props;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="font-extrabold text-6xl mt-4 mb-3">{title}</div>
      <div className="font-extrabold text-xl m-2">{subTitle}</div>
      {children}
    </div>
  );
}

export default Menu;
