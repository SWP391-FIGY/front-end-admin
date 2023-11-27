import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { birdStatusEnum } from '@/app/birds/index/birdInfo';
import { API } from '@/constants';
import useAxios from '@/hooks/useFetch';

export const BirdPieChart = () => {
  const { response, loading, error } = useAxios({
    method: 'get',
    url: `${API}/bird?select=*`,
  });

  function countEntitiesByStatusAndReturnArray(statuses, entities) {
    const countsArray = [];

    for (const status of statuses) {
      let count = 0;
      for (const entity of entities) {
        if (status == entity.Status) {
          count++;
        }
      }
      countsArray.push(count);
    }

    return countsArray;
  }

  const statusCount = response ? countEntitiesByStatusAndReturnArray(birdStatusEnum, response) : [];

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: response ? birdStatusEnum : [],
    datasets: [
      {
        label: '# of Birds',
        data: statusCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};
