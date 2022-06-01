import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('https://9dbf-103-137-84-186.in.ngrok.io', {  //here put server side ngrok url and then run... 
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    socket.on('streamData', (data) => {
      setResponse(data);

      console.log(data);

    });

    //return () => socket.disconnect();
  }, [response]);

  return (
    <p>
      {response.Employee_Name}
    </p>
  );

}

export default App;