import { useEffect, useState, useRef } from 'react';
import './App.css'

import { Filters, Table } from './components';
import { fetchUsers } from './api';
import { User, ID, FiltersSettings } from './types';

function App() {
  const obtainedUsers = useRef<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [{color, input, sortByCountry}, setFilterSettings] =
    useState<FiltersSettings>({
      sortByCountry: false, 
      input: '',
      color: false,
    });

  const deleteUser = ({name, value}: ID) =>
    setUsers( prev => prev.filter( ({id}) => id.value !== value && id.name !== name));

  useEffect(() => {
    fetchUsers()
      .then(users => {
        obtainedUsers.current = users.slice();
        setUsers(users);
      })
  }, []);

  useEffect(() => {
    let filteredUsers;

    if( input?.length ){
      filteredUsers = obtainedUsers?.current.filter(
        ({ location }) => location.country.toLowerCase().includes(input)
      );
    } else {
      filteredUsers = obtainedUsers?.current.slice();
    }
    
    setUsers(filteredUsers);
  }, [input, sortByCountry]);

  useEffect(() => {
    if(sortByCountry){
      console.log('====> Sorting by Country ');

      const sortedUsers = users.slice().sort((a, b) => {
        if( a.location.country === b.location.country )
          return 0;
         
        return a.location.country < b.location.country ? -1 : 1 
      });
    
      setUsers(sortedUsers);
    }
  }, [sortByCountry]);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Technical Test
      </h1>

      <Filters
        filterSettings={{color, input, sortByCountry}}
        setFilterSettings={setFilterSettings}
      />
      <Table
        users={users}
        color={color}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default App
