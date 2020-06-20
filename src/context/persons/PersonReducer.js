import {
  GET_PERSONS,
  ADD_PERSON,
  UPDATE_PERSON,
  CURRENT_PERSON,
  DELETE_PERSON,
  PERSON_LOADER,
  PERSON_NOTLOADER,
} from '../types';
export default (state, action) => {
  switch (action.type) {
    case GET_PERSONS:
      // console.log(action.payload);
      return {
        ...state,
        persons: action.payload,
        loading: false,
        addLoading: false,
      };
    case ADD_PERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload],
      };
    case CURRENT_PERSON:
      return {
        ...state,
        person: action.payload,
        // loading: false,
        // person: state.persons.filter((person) => person._id === action.payload),
      };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(
          (person) => person._id !== action.payload
        ),
      };
    case PERSON_LOADER:
      return {
        ...state,
        loading: true,
      };
    case PERSON_NOTLOADER:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PERSON:
      return {
        ...state,
        persons: state.persons.map((person) =>
          person.idPersona === action.payload.idPersona
            ? action.payload
            : person
        ),
      };
    default:
      return state;
  }
};
