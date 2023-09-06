import React from 'react';

import { User, ID } from '../types';

import { Button } from './index';

interface TableProps {
  users: User[];
  color: boolean;
  deleteUser: (id: ID) => void;
}

const Table: React.FC<TableProps> = ({ color, users, deleteUser }) => {
  const cellClass = 'p-2 mx-4 w-1/5 flex justify-center';
  const rowColorClass = color
    ? 'odd:bg-amber-50 even:bg-amber-100'
    : 'odd:bg-white even:bg-slate-50';
  const rowClass = 'flex w-full items-center '.concat(rowColorClass);
  const tHeadClass =
    `flex flex-row w-full rounded-md justify-around ${color ? 'bg-amber-100' :'bg-slate-50'}`

    return (
      <div className='flex justify-center items-center w-full px-8'>
        <table className='flex flex-col w-full rounded-md border-2 border-sky-600'>
          <thead className={tHeadClass}>
            <tr className='flex w-full'>
              <th className={cellClass}>Pic</th>
              <th className={cellClass}>Name</th>
              <th className={cellClass}>Surname</th>
              <th className={cellClass}>Country</th>
              <th className={cellClass}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              users.map(({ id, name, location, picture}, idx) => (
                <tr key={idx + id.name + id.value} className={rowClass} data-testid="table-row">
                  <td className={cellClass}>
                    <img className="rounded-full" src={picture.thumbnail}/>
                  </td>
                  <td className={cellClass}>{name.first}</td>
                  <td className={cellClass}>{name.last}</td>
                  <td className={cellClass}>{location.country}</td>
                  <td className={cellClass}>
                    <Button onClick={() => deleteUser(id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
};

export default Table