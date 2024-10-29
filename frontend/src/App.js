import { useEffect, useState } from "react";
import "./App.css";


function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/country");
    const data = await response.json();
    setData(data);
  };

  // Llamamos a fetchData con throttle para limitar la frecuencia
  const throttledFetchData = throttle(fetchData, 3000);

  useEffect(() => {
    throttledFetchData(); // Solo se llamará cada 3 segundos
  }, []);

  return (
    <div>
      {data && data.map((item) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
