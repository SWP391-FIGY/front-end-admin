import { useEffect, useState } from 'react';

import { message } from 'antd';
import { Spinner } from 'flowbite-react';
import DataTable from 'react-data-table-component';

import { API } from '@/constants';
import { getUserInfo } from '@/helper';
import useAxios from '@/hooks/useFetch';

import { userColumns } from './userInfo';

const UserList = () => {
  const [keyword, setKeyword] = useState('');
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/user`,
  });

  const [userData, setUserData] = useState([]);

  const user = getUserInfo();
  useEffect(() => {
    if (user && response && response.length > 0) {
      user.role === 'Admin' ? setUserData(response.filter((x) => x.role != 'Admin')) : setUserData(response.filter((x) => x.id == user.id));
    }
  }, [response]);

  if (error) {
    message.error('Error While Getting User data');
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
            console.log(keyword);
          }}
          name="search"
          placeholder="Enter your search"
        />
      </div>
      <DataTable
        columns={userColumns}
        data={
          keyword && keyword.length > 0
            ? userData.filter((x) => {
                const idMatch = x.id.toString().includes(keyword);
                const nameMatch = x.name.toLowerCase().includes(keyword.toLowerCase());
                return idMatch || nameMatch;
              })
            : userData
        }
        pagination
        className="overflow-auto"
        customStyles={customStyles}
      />
    </>
  );
};

export default UserList;
