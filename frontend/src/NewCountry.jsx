import { useNavigate, useLocation  } from 'react-router-dom';
import { useState } from 'react';
import styles from "./NewCountry.module.css"

function NewCountry(){
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [age, setAge] = useState('');
  const [population, setPopulation] = useState('');
  const [region, setRegion] = useState('');


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newCountry = { name, img, age: parseInt(age), population, region };
    
    const response = await fetch('http://localhost:4000/country', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCountry),
    });
    
    if (response.ok) {
      alert('País agregado exitosamente');
      navigate('/');
    } else {
      alert('Error al agregar el país');
    }
  };

  return (
    <div className={styles.container_form}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>crear nuevo pais</h2>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Imagen URL" value={img} onChange={(e) => setImg(e.target.value)} required />
        <input type="number" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="text" placeholder="Población" value={population} onChange={(e) => setPopulation(e.target.value)} required />
        <select value={region} onChange={(e) => setRegion(e.target.value)} required>
          <option value="">Selecciona región</option>
          <option value="norteamerica">Norteamérica</option>
          <option value="suramerica">Suramérica</option>
          <option value="europa">Europa</option>
          <option value="africa">África</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceanía</option>
        </select>
        <button type="submit">Agregar</button>
        </form>
    </div>
  );
}


export default NewCountry;