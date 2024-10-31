import { useEffect, useState } from "react";
import styles from "./App.module.css";
import "./Normal.css"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import EditCountry from "./EditCountry.jsx"
import NewCountry from "./NewCountry.jsx"


// function throttle(func, limit) {
//   let lastFunc;
//   let lastRan;
//   return function (...args) {
//     if (!lastRan) {
//       func(...args);
//       lastRan = Date.now();
//     } else {
//       clearTimeout(lastFunc);
//       lastFunc = setTimeout(function () {
//         if (Date.now() - lastRan >= limit) {
//           func(...args);
//           lastRan = Date.now();
//         }
//       }, limit - (Date.now() - lastRan));
//     }
//   };
// }

function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/country");
    const data = await response.json();
    setData(data);
  };

  // Llamamos a fetchData con throttle para limitar la frecuencia
  // const throttledFetchData = throttle(fetchData, 3000);

  useEffect(() => {
    fetchData(); // Solo se llamará cada 3 segundos
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/country/${id}`, {
      method: 'DELETE',
    });

    setData((prevData) => prevData.filter((country) => country._id !== id));
  };

  const handleEditClick = (country) => {
    navigate(`/edit/${country._id}`, { state: { country } });
  };



  return (
          <div className={styles.container}>
            <button onClick={() => navigate('/add-country')}>Agregar País</button>
            {data && data.map((country) => (
              <article key={country._id} className={styles.card}>
                <div className={styles.imgcountry}>
                  <img src={country.img}></img>
                </div>
                <div className={styles.container_text}>
                  <div className={styles.title}> 
                    <h1>{country.name}</h1>
                  </div>
                  <div className={styles.text}>
                    <h2>edad: {country.age}</h2>
                    <h2>poblacion: {country.population}</h2>
                    <h2>continente: {country.region}</h2>
                  </div>
                </div>
                <div className={styles.container_button}>
                  <button className={styles.edit} onClick={() => handleEditClick(country)}>editar</button>
                  <button className={styles.delete} onClick={() =>handleDelete(country._id)}>eliminar</button>
                </div>
              </article>
              ))}
          </div>
  );
}

function MainApp() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/edit/:id" element={<EditCountry/>} />
      <Route path="/add-country" element={<NewCountry/>} />
    </Routes>
  );
}

export default MainApp;
