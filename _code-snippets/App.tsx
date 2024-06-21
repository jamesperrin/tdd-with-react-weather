import React, { useEffect, useState } from 'react';
import './App.css';
import { createServer, Response } from 'miragejs';
import data from './data.json';

createServer({
  routes() {
    this.get('/api/users', () => {
      return data;
    });

    this.get('/api/users/error', () => {
      return new Response(401, {}, { errors: ['You are in the wrong place'] });
    });

    this.get('/api/users/:id', (schema, request) => {
      const id = parseInt(request.params.id);
      return [data.find((data) => data.id === id)];
    });

    this.get('/api/search', (schema, request) => {
      const query = request.queryParams['query'];

      if (query === 'red') {
        return [{ id: 1, name: 'red' }];
      } else {
        return [{ id: 1, name: 'black' }];
      }
    });
  },
});

type User = {
  id: number;
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch('/api/users')
        .then((r) => r.json())
        .then((users) => setUsers(users));
    };

    const fetchUsersError = () => {
      fetch('/api/users/error')
        .then((r) => r.json())
        .then((users) => setUsers(users));
    };

    const getUser = () => {
      fetch('/api/users/3')
        .then((r) => r.json())
        .then((users) => setUsers(users));
    };

    const searchUsers = () => {
      fetch(`/api/search?query=black`)
        .then((r) => r.json())
        .then((users) => setUsers(users));
    };

    const fetchUsersAsync = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsersError();
  }, []);

  return (
    <div className="App">
      {users.length < 1 ? <div>No data</div> : users.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}

export default App;
