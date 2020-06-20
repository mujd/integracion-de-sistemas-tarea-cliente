import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import personContext from '../../../context/persons/personContext';

const CreatePerson = () => {
  const history = useHistory();
  const defaultPerson = {
    nombre: '',
    email: '',
    edad: '',
  };
  const [currentPerson, setCurrentPerson] = useState(defaultPerson);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(defaultPerson);
  const proyectosContext = useContext(personContext);
  const { loading, isloading, notloading, createPerson } = proyectosContext;

  useEffect(() => {
    notloading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setCurrentPerson({
      ...currentPerson,
      [e.target.name]: e.target.value,
    });
  };
  const { nombre, email, edad } = currentPerson;

  const validateEmail = (e) => {
    const value = e.target.value;
    let error;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Ingrese un email válido. Ejemplo: "email@email.cl".';

      setErrorText({
        ...errorText,
        email: 'Ingrese un email válido. Ejemplo: "email@email.cl".',
      });
      //   setErrorText('Ingrese un email válido. Ejemplo: "email@email.cl".');
    } else {
      setErrorText('');
    }
    return error;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      currentPerson.nombre.trim() === '' ||
      currentPerson.email.trim() === '' ||
      currentPerson.edad <= 0
    ) {
      setError(true);
      return;
    }
    setError(false);
    isloading();
    createPerson(currentPerson)
      .then((result) => {
        history.push(`/`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h3>Nueva Persona</h3>
      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          Todos los campos son obligatorios!
        </div>
      )}
      {currentPerson && (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="font-weight-bold">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="font-weight-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={validateEmail}
            />
            {errorText.email !== '' && (
              <small className="text-danger">{errorText.email}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="age" className="font-weight-bold">
              Edad
            </label>
            <input
              type="number"
              className="form-control"
              id="edad"
              name="edad"
              min="0"
              value={edad}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Link to={'/'} className="btn btn-light">
              Volver
            </Link>
            <button type="submit" className="btn btn-dark">
              {loading ? (
                <div className="d-flex justify-content-between align-items-center flex-row">
                  <div className="spinner-border" role="status"></div>
                  <span className="ml-2">Cargando...</span>
                </div>
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePerson;
