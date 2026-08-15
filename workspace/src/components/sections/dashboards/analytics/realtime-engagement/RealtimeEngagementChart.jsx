import { useEffect, useState } from 'react';
import { getRandomNumber } from 'lib/utils';
import WeeklyActivityChart from 'components/sections/dashboards/time-tracker/kpi/WeeklyActivityChart';

const initialData = [20, 19, 11, 25, 25, 27, 21];

const RealtimeEngagementChart = ({ sx, updateUserCounter }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextValue = getRandomNumber(10, 30);

      setData((previousData) => [...previousData.slice(1), nextValue]);
      updateUserCounter?.(nextValue);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <WeeklyActivityChart data={data} sx={sx} />;
};

export default RealtimeEngagementChart;
