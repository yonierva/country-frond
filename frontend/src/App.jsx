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
    <><nav className="nav-bar">
      <input type="search" />
    </nav>
    <div className="container">
        {data && data.map((country) => (
          <article key={country._id}>
            <img src={country.img}></img>
            <h1>{country.name}</h1><br></br>
            <h2>{country.age}</h2>
          </article>
        ))}
      </div></>
  );
}

export default App;
