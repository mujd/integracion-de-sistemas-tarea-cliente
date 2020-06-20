import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import personContext from '../../../context/persons/personContext';

const EditPerson = () => {
  const history = useHistory();
  const defaultPerson = {
    nombre: '',
    email: '',
    edad: '',
  };
  const [currentPerson, setCurrentPerson] = useState(defaultPerson);
  const proyectosContext = useContext(personContext);
  const {
    loading,
    notloading,
    isloading,
    person,
    updatePerson,
  } = proyectosContext;
  const lsPerson = localStorage.getItem('person');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(defaultPerson);
  useEffect(() => {
    notloading();
    if (person !== null) {
      setCurrentPerson(person);
    } else {
      setCurrentPerson(JSON.parse(lsPerson));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { nombre, email, edad } = currentPerson;
  const handleChange = (e) => {
    setCurrentPerson({
      ...currentPerson,
      [e.target.name]: e.target.value,
    });
  };
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
    if (nombre.trim() === '' || email.trim() === '' || edad <= 0) {
      setError(true);
      return;
    }
    setError(false);

    isloading();
    updatePerson(currentPerson)
      .then((result) => {
        history.push(`/`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h3>Editar Persona - {nombre} </h3>
      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          Todos los campos son obligatorios!
        </div>
      )}
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
              'Actualizar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPerson;
