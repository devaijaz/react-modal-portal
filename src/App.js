import Modal from './components/Modal';
import { useState } from 'react';
function App() {
  const [open, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const closeHandler = () => setOpen(false);
  const childCloseHandler = () => setChildOpen(false);
  return (
    <div className="App">
      <h1>React Portal Example</h1>
      <button onClick={() => { setOpen(true) }}>Open Modal</button>

      {open && <Modal onClose={closeHandler} locked={true} title="Modal Demo">
        <div className="confirmDialog">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <button onClick={closeHandler}>Close</button>
          <button onClick={() => { setChildOpen(true) }}>Open Another</button>
        </div>
      </Modal>}
      {childOpen && <Modal onClose={childCloseHandler} title="Modal on Modal Demo">
        <div>
          <p>I am in Child Modal</p>
          <button onClick={childCloseHandler}>Close</button>
        </div>
      </Modal>}
    </div>
  );
}

export default App;

