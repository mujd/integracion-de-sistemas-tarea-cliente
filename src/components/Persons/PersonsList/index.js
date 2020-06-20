import React, { useContext, useEffect } from 'react';
import personContext from '../../../context/persons/personContext';
import List from './List';

const PersonsList = () => {
  const proyectosContext = useContext(personContext);
  const { loading, persons, getPersons } = proyectosContext;
  useEffect(() => {
    if (loading) {
      getPersons();
      localStorage.setItem('person', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h3>Listado de personas</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {persons.length === 0 || loading ? (
              <tr>
                <td colSpan="5">
                  <div className="d-flex justify-content-center p-5">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Cargando...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              persons.map((person, i) => (
                <List key={person.idPersona} {...{ person }} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PersonsList;
