import React, { useReducer } from 'react';
import personContext from './personContext';
import clienteAxios from '../../config/axios';
import PersonReducer from './PersonReducer';
import {
  GET_PERSONS,
  ADD_PERSON,
  UPDATE_PERSON,
  CURRENT_PERSON,
  DELETE_PERSON,
  PERSON_LOADER,
  PERSON_NOTLOADER,
} from '../types';

const PersonState = (props) => {
  const initialState = {
    persons: [],
    person: null,
    loading: true,
    addLoading: false,
  };
  // Dispatch para ejecutar las acciones
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(PersonReducer, initialState);

  const isloading = () => {
    dispatch({
      type: PERSON_LOADER,
      payload: true,
    });
  };
  const notloading = () => {
    dispatch({
      type: PERSON_NOTLOADER,
      payload: false,
    });
  };

  // get persons
  const getPersons = async () => {
    // isloading();
    try {
      const result = await clienteAxios.get('/api/values');
      // console.log(result.data);
      dispatch({
        type: GET_PERSONS,
        payload: result.data,
      });
      // notloading();
    } catch (error) {
      console.log(error);
      // notloading();
    }
  };

  // get current person
  const getCurrentPerson = (person) => {
    localStorage.setItem('person', JSON.stringify(person));
    dispatch({
      type: CURRENT_PERSON,
      payload: person,
    });
  };

  // create person
  const createPerson = async (person) => {
    try {
      await clienteAxios.post('/api/values', person);

      dispatch({
        type: ADD_PERSON,
        payload: person,
      });
      getPersons();
    } catch (error) {
      notloading();
      console.log(error);
    }
  };
  const deletePerson = async (idPersona) => {
    try {
      await clienteAxios.delete(`/api/values/${idPersona}`);
      dispatch({
        type: DELETE_PERSON,
        payload: idPersona,
      });
      getPersons();
    } catch (error) {
      notloading();
      console.log(error);
    }
  };
  const updatePerson = async (person) => {
    try {
      await clienteAxios.put(`/api/values/${person.idPersona}`, person);
      // console.log(res);
      dispatch({
        type: UPDATE_PERSON,
        payload: person,
      });
      getPersons();
    } catch (error) {
      notloading();
      console.log(error);
    }
  };

  return (
    <personContext.Provider
      value={{
        persons: state.persons,
        person: state.person,
        loading: state.loading,
        addLoading: state.addLoading,
        getPersons,
        getCurrentPerson,
        createPerson,
        updatePerson,
        deletePerson,
        isloading,
        notloading,
      }}>
      {props.children}
    </personContext.Provider>
  );
};

export default PersonState;
