import { formatDateRange } from '../../helpFunctions/formatDateRange';
import { getTimeIn24HourFormat } from '../../helpFunctions/getTimeIn24HourFormat';
import { Week } from '../../interfaces/Week';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { WeekDay } from './weekDay/WeekDay';
import './weekGrid.css';

export const WeekGrid = () => {
  const { currentWeek, setCurrentWeek, weeks } = useWeeksStore();

  const daysArray = Object.entries(currentWeek.days) as [keyof Week['days'], Week['days'][keyof Week['days']]][];
  const dateRange = formatDateRange(currentWeek.weekStartDate, currentWeek.weekEndDate);

  const handleWeekChange = (week: Week) => {
    setCurrentWeek(week);
  };

  const firstSixWeeks = weeks?.slice(0, 6);
  const firstThreeWeeks = firstSixWeeks?.slice(0, 3);
  const secondThreeWeeks = firstSixWeeks?.slice(3, 6);

  return (
    <div>
      <div className='box'>
        <div className='box_center'>
          <h1>Select The Week</h1>
          <select className='select_week'>
            {weeks.map((week, index) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);

              return (
                <option className='select_week_option' key={index} label={date}>
                  {date}
                </option>
              );
            })}
          </select>
        </div>
        <div className='week_selector'>
          <div className='first_three_weeks'>
            {firstThreeWeeks.map((week) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);

              return (
                <button
                  key={week.id}
                  className={`week_button ${currentWeek.id === week.id ? 'active' : ''}`}
                  onClick={() => handleWeekChange(week)}
                >
                  {date}
                </button>
              );
            })}
          </div>
          <div className='second_three_weeks'>
            {secondThreeWeeks.map((week) => {
              const date = formatDateRange(week.weekStartDate, week.weekEndDate);

              return (
                <button
                  key={week.id}
                  className={`week_button ${currentWeek.id === week.id ? 'active' : ''}`}
                  onClick={() => handleWeekChange(week)}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <h1 className='week_date'>{dateRange}</h1>
      <div className='week_grid'>
        {daysArray.map(([day, tasks], index) => {
          const sortedTasks = [...tasks].sort((a, b) => getTimeIn24HourFormat(a) - getTimeIn24HourFormat(b));

          if (index === daysArray.length - 1) {
            return (
              <div key={`sunday-${index}`} style={{ gridColumn: 2 }}>
                <WeekDay dayTasks={sortedTasks} weekDay='sunday' />
              </div>
            );
          }
          return <WeekDay key={day} dayTasks={sortedTasks} weekDay={day} />;
        })}
      </div>
    </div>
  );
};
