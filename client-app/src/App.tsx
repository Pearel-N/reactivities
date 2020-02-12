import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
      .catch();
  }

  render() {
    return (
      <div>
        <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
