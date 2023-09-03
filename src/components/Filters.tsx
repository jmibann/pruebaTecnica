import React from 'react';

import { Button, Input } from './index';
import { FiltersSettings } from '../types';

interface FiltersProps {
  filterSettings: FiltersSettings;
  setFilterSettings: React.Dispatch<React.SetStateAction<FiltersSettings>>;
}

const Filters: React.FC<FiltersProps> = ({ filterSettings, setFilterSettings }) => {

  const reset = () => setFilterSettings({
    color: false,
    sortByCountry: false,
    input: ''
  });

  const sort = () => setFilterSettings( prev => ({
      ...filterSettings,
      sortByCountry: !prev.sortByCountry,
    }));

  const changeColor = () => setFilterSettings( prev => ({
    ...filterSettings,
    color: !prev.color,
  }));

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    setFilterSettings(prev => ({
      ...prev, 
      input: event.target.value.toLowerCase(),
    }));

  return (
    <div className='flex w-full justify-center items-center p-8'>
      <Button onClick={changeColor}> Color row </Button>
      <Button onClick={sort} isActive={filterSettings.sortByCountry}>
        Sort By Country
      </Button>
      <Button onClick={reset}> Reset State </Button>
      <Input
        onChange={handleOnChange}
        value={filterSettings.input}
        placeholder='Filter by country'
      />
    </div>);
};

export default Filters