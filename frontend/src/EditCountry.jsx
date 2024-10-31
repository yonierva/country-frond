import { useNavigate, useLocation  } from 'react-router-dom';
import { useState } from 'react';

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
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

    return (
        <div>
            <h2>Edit Country</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />

                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />

                <label>Population:</label>
                <input type="text" name="population" value={formData.population} onChange={handleChange} />

                <label>Region:</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} />

                <button type="submit">Update Country</button>
            </form>
        </div>
    );
}

export default EditCountry;