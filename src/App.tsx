import { useEffect, useRef, useState, useMemo } from 'react';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

import './App.css'

import { Fallback, Filters, Table } from './components';
import { fetchUsers } from './api';
import { User, ID, FiltersSettings } from './types';

function App() {
  const originalUsers = useRef<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
   
  const { showBoundary } = useErrorBoundary();
  const [{color, input, sortByCountry}, setFilterSettings] =
    useState<FiltersSettings>({
      sortByCountry: false, 
      input: '',
      color: false,
  });

  useEffect(() => {
    fetchUsers()
      .then(users => {
        originalUsers.current = users;
        setUsers(users);
      })
      .catch(error => showBoundary(error));
  }, []);

  const sorterFn = (a: User, b:User) => {
    if( a.location.country === b.location.country )
      return 0;
      
    return a.location.country < b.location.country ? -1 : 1 
  };

  const filteredUsers = useMemo(() => {
    return input?.length 
        ? users.filter(({ location }) =>
            location.country.toLowerCase().includes(input)
        )
        : users;
  }, [input, users]);
  
  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted(sorterFn)
      : filteredUsers
  }, [sortByCountry, filteredUsers]); 

  const deleteUser = ({name, value}: ID) =>
    setUsers( prev => prev.filter( ({id}) => id.value !== value && id.name !== name));

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
        color={color}
        users={sortedUsers}
        deleteUser={deleteUser}
      />
    </>
  )
}

const Application : React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  );
}


export default Application;
