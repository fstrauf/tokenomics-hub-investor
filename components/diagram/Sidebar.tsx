import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='w-52 bg-dark-tdao'>
      {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
      <div className="bg-dao-red w-28 mt-3 mb-3 text-white text-center rounded-md m-auto" onDragStart={(event) => onDragStart(event, 'ResizeableGroup')} draggable>
        Group
      </div>
      <div className="bg-dao-green w-28 mt-3 mb-3 text-white border-2 border-white text-center rounded-md m-auto" onDragStart={(event) => onDragStart(event, 'ComponentNode')} draggable>
        Component
      </div>
      <div className="bg-dark-tdao w-28 mt-3 mb-3 text-white border-2 border-white text-center rounded-md m-auto" onDragStart={(event) => onDragStart(event, 'NoteNode')} draggable>
        Notes
      </div>
    </aside>
  );
};
