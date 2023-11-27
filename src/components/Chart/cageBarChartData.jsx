import React, { useEffect, useState } from 'react';

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CageBarChartData = () => {
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/cage?expand=Birds`,
  });

  const [cageCounts, setCageCounts] = useState([]);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Number of bird in Cage',
      },
    },
  };

  const data = {
    labels: response && response.length > 0 ? response.slice(0, 5).map((item) => `Cage ${item.ID}`) : [],
    datasets: [
      {
        label: 'Bird in cage',
        data: response && response.length > 0 ? response.slice(0, 5).map((item) => item.Birds.length) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <>{response && <Bar options={options} data={data} />}</>;
};

export default CageBarChartData;
