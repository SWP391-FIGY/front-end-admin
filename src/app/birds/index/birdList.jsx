import React, { useEffect, useState } from 'react';

import { message } from 'antd';
import { Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

import { birdColumns, birdInfo } from './birdInfo';

const BirdList = () => {
  const [keyword, setKeyword] = useState('');
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/bird?expand=cage,species`,
  });

  console.log('Fetched bird data', response);
  if (error) {
    message.error('Error While Getting Bird data');
    return <>No Data</>;
  }
  if (loading && !error)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );

  const customStyles = {
    rows: {
      style: {
        padding: '20px 0',
      },
    },
    headCells: {
      // style: {
      //   paddingLeft: "3px", // override the cell padding for data cells
      //   paddingRight: "3px",
      // },
    },
    cells: {
      // style: {
      //   paddingLeft: "3px", // override the cell padding for data cells
      //   paddingRight: "3px",
      // },
    },
  };

  return (
    <>
      <div className="flex flex-row">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          name="search"
          placeholder="Enter your search"
        />
      </div>
      <DataTable
        columns={birdColumns}
        data={
          response && response.length > 0 && keyword && keyword.length > 0
            ? response.filter((x) => {
                console.log('filter item', x);
                const idMatch = x.Id.toString().includes(keyword);
                const speciesMatch = x.Species.Name.toLowerCase().includes(keyword.toLowerCase());

                return idMatch || speciesMatch;
              })
            : response
        }
        pagination
        className="overflow-auto"
        customStyles={customStyles}
      />
    </>
  );
};

export default BirdList;
