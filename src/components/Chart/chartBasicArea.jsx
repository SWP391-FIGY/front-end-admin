'use client';

import * as React from 'react';

import dynamic from 'next/dynamic';

import { formatNumber } from '../../utils/number.helper';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartBasicArea = ({ title, values, unit, colors }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ReactApexChart
        options={{
          chart: {
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'straight',
          },

          title: {
            text: title,
            align: 'left',
          },
          labels: values.map((item) => item.name),
          xaxis: {
            labels: {
              formatter: (value) => {
                return value;
              },
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => {
                return formatNumber(value);
              },
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          colors: colors,
        }}
        series={[
          {
            name: unit,
            data: values.map((item) => item.data),
          },
        ]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartBasicArea;
