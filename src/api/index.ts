import axios from 'axios'

import { Result } from '../types';

const URL = 'https://randomuser.me/api/?results=100&inc=name,picture,location,id';

export const fetchUsers = () => axios.get<Result>(URL)
  .then(({ data }) => data.results);