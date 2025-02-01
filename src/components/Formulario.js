import React, { useState } from 'react';


const Formulario = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        direccion: '',
        edad: '',
        genero: '',
        celular: '',
        comentarios: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar los datos al backend
            const response = await fetch('http://localhost/api/formulario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convertir los datos a JSON
            });

            if (response.ok) {
                // Si la respuesta es exitosa, limpiar el formulario
                setFormData({
                    nombres: '',
                    apellidos: '',
                    direccion: '',
                    edad: '',
                    genero: '',
                    celular: '',
                    comentarios: ''
                });
                alert('Datos enviados correctamente');
            } else {
                // Si hay un error, mostrar un mensaje
                alert('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar los datos');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Ingresa como cuidas tu a tu mascota</h2>

            {[
                { name: 'nombres', label: 'Nombres', type: 'text' },
                { name: 'apellidos', label: 'Apellidos', type: 'text' },
                { name: 'direccion', label: 'Dirección', type: 'text' },
                { name: 'edad', label: 'Edad', type: 'number', min: 0 },
                { name: 'celular', label: 'Celular', type: 'tel' },
                { name: 'comentarios', label: 'Comentarios', type: 'textarea' },
            ].map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name} className="form-label">
                        {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="form-input form-textarea"
                            placeholder={`Ingrese ${field.label.toLowerCase()}...`}
                    required
        />
                    ) : (
                    <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-input"
                        placeholder={`Ingrese ${field.label.toLowerCase()}...`}
                    min={field.min}
                    required
        />
      )}
                </div>
            ))}

            <div className="form-group">
                <label htmlFor="genero" className="form-label">
                    Género
                </label>
                <select
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">Seleccione su género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="otro">Otro/Prefiero no decir</option>
                </select>
            </div>

            <button type="submit" className="submit-button">
                Enviar Datos
            </button>
        </form>
    );
};

export default Formulario;