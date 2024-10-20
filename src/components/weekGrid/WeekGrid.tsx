import { useState } from 'react';
import { formatDateRange } from '../../helpFunctions/formatDateRange';
import { getTimeIn24HourFormat } from '../../helpFunctions/getTimeIn24HourFormat';
import { Week } from '../../interfaces/Week';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { WeekDay } from './weekDay/WeekDay';
import { ShowAllWeeks } from '../showAllWeeks/ShowAllWeeks';
import './weekGrid.css';

export const WeekGrid = () => {
  const { currentWeek, setCurrentWeek, weeks } = useWeeksStore();
  const [showAllWeeks, setShowAllWeeks] = useState<boolean>(false);

  const daysArray = Object.entries(currentWeek.days) as [keyof Week['days'], Week['days'][keyof Week['days']]][];
  const dateRange = formatDateRange(currentWeek.weekStartDate, currentWeek.weekEndDate);

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeekId = event.target.value;
    const selectedWeek = weeks.find((week) => week.id === selectedWeekId);
    if (selectedWeek) setCurrentWeek(selectedWeek);
  };

  const firstSixWeeks = weeks?.slice(0, 6);
  const firstThreeWeeks = firstSixWeeks?.slice(0, 3);
  const secondThreeWeeks = firstSixWeeks?.slice(3, 6);

  return (
    <div>
      <div className='box'>
        <div className='box_center'>
          <h1>Select The Week</h1>
          <select className='select_week' onChange={handleWeekChange} value={currentWeek.id}>
            {weeks.map((week) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);
              return (
                <option className='select_week_option' key={week.id} value={week.id}>
                  {date}
                </option>
              );
            })}
          </select>
        </div>

        <div className='week_selector'>
          <ul className='first_six_weeks_list'>
            {firstThreeWeeks.map((week) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);
              return (
                <li key={week.id} className='first_six_weeks_list_item'>
                  <button className={`week_button ${currentWeek.id === week.id ? 'active' : ''}`} onClick={() => setCurrentWeek(week)}>
                    {date}
                  </button>
                </li>
              );
            })}
          </ul>

          <ul className='first_six_weeks_list'>
            {secondThreeWeeks.map((week) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);
              return (
                <li key={week.id} className='first_six_weeks_list_item'>
                  <button className={`week_button ${currentWeek.id === week.id ? 'active' : ''}`} onClick={() => setCurrentWeek(week)}>
                    {date}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <h1 className='week_date'>{dateRange}</h1>
      <div className='week_grid'>
        {daysArray.map(([day, tasks]) => {
          const sortedTasks = [...tasks].sort((a, b) => getTimeIn24HourFormat(a) - getTimeIn24HourFormat(b));
          return <WeekDay key={day} dayTasks={sortedTasks} weekDay={day} />;
        })}
        <ShowAllWeeks showAllWeeks={showAllWeeks} setShowAllWeeks={setShowAllWeeks} />
      </div>
    </div>
  );
};
