import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import personContext from '../../../context/persons/personContext';

const List = ({ person }) => {
  const history = useHistory();
  const proyectosContext = useContext(personContext);
  const { isloading, getCurrentPerson, deletePerson } = proyectosContext;
  const { idPersona, nombre, email, edad } = person;

  const redirectToEdit = (person) => {
    getCurrentPerson(person);
    history.push(`/persona/editar/${person.idPersona}`);
  };
  const deletePersonFunc = (idPersona) => {
    const isConfirm = window.confirm('Estas seguro?');
    if (isConfirm) {
      isloading();
      deletePerson(idPersona);
    }
  };
  return (
    <tr>
      <td> {idPersona} </td>
      <td> {nombre} </td>
      <td> {email} </td>
      <td> {edad} </td>
      <td>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-info mr-2"
            onClick={() => redirectToEdit(person)}>
            <span className="material-icons">edit</span> Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deletePersonFunc(idPersona)}>
            <span className="material-icons">delete</span> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default List;
