import React from 'react';
import Header from './components/layout/Header';
import PersonState from './context/persons/PersonState';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PersonsList from './components/Persons/PersonsList';
import CreatePerson from './components/Persons/CreatePerson';
import EditPerson from './components/Persons/EditPerson';

function App() {
  return (
    <PersonState>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <div className="main-card mb-5">
              <Switch>
                <Route exact path="/" component={PersonsList} />
                <Route exact path="/persona/nuevo" component={CreatePerson} />
                <Route
                  exact
                  path="/persona/editar/:id"
                  component={EditPerson}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </PersonState>
  );
}

export default App;
