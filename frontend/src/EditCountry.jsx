import { useNavigate, useLocation  } from 'react-router-dom';
import { useState } from 'react';
import styles from "./EditCountry.module.css"

function EditCountry() {
  const location = useLocation();
  const { country } = location.state || {}; // Verifica si country existe

  if (!country) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga o un spinner
  }

  const [formData, setFormData] = useState({
    name: country.name || '',
    img: country.img || '',
    age: country.age || '',
    population: country.population || '',
    region: country.region || '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) : value, // Convierte a número si el campo es 'age'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/country/${country._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        navigate('/'); // Redirigir después de la actualización
      } else {
        const errorData = await response.json();
        console.error('Error updating country:', errorData);
        // Manejar el error
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

    return (
        <div className={styles.container_form}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Edit Country</h2>
                <label >Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />

                <label>imagen:</label>
                <input type="text" name="img" value={formData.img} onChange={handleChange} />

                <label >Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />

                <label >Population:</label>
                <input type="text" name="population" value={formData.population} onChange={handleChange} />

                <label>Region:</label>
                <select name="region" value={formData.region} onChange={handleChange} required>
                  <option value="">Selecciona región</option>
                  <option value="norteamerica">Norteamérica</option>
                  <option value="suramerica">Suramérica</option>
                  <option value="europa">Europa</option>
                  <option value="africa">África</option>
                  <option value="asia">Asia</option>
                  <option value="oceania">Oceanía</option>
                </select>

                <button type="submit">guardar</button>
            </form>
        </div>
    );
}

export default EditCountry;