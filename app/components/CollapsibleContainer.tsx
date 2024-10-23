import { useState } from 'react';

type CollapsibleContainerProps = {
  title: string;
  children: React.ReactNode;
};

function CollapsibleContainer({ title, children }: CollapsibleContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded mb-4">
      <div
        className="bg-gray-200 p-2 cursor-pointer flex justify-between items-center"
        onClick={toggleOpen}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}

export default CollapsibleContainer;