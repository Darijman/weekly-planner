import { useState } from 'react';
import { formatDateRange } from '../../helpFunctions/formatDateRange';
import { useThemeStore } from '../../stores/useThemeStore/useThemeStore';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import './showAllWeeks.css';
import { Modal } from '../../ui/modal/Modal';

interface Props {
  showAllWeeks: boolean;
  setShowAllWeeks: (showAllWeeks: boolean) => void;
}

export const ShowAllWeeks = ({ showAllWeeks, setShowAllWeeks }: Props) => {
  const { weeks, currentWeek, setCurrentWeek, deleteWeek } = useWeeksStore();
  const { isDark } = useThemeStore();

  const [weekIdToDelete, setWeekIdToDelete] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = (event: any, weekId: string) => {
    event.stopPropagation();
    setWeekIdToDelete(weekId);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setWeekIdToDelete('');
    setShowModal(false);
  };

  const deleteWeekHandler = () => {
    deleteWeek(weekIdToDelete);
    setShowModal(false);
  };

  return (
    <div className='show_all_weeks_container'>
      <div className='weeks_top'>
        <h3 className='all_weeks_title'>Weeks ({weeks.length})</h3>
        <button onClick={() => setShowAllWeeks(!showAllWeeks)} className='hide_weeks_button' title='Show All Weeks'>
          {showAllWeeks ? '-' : '+'}
        </button>
      </div>
      {showAllWeeks && (
        <div className='all_weeks'>
          <div>
            <ul className='all_weeks_list'>
              {weeks.map((week, index) => {
                const date = formatDateRange(week.weekStartDate, week.weekEndDate);
                return (
                  <li
                    onClick={() => setCurrentWeek(week)}
                    className={`weeks_list_item ${currentWeek.id === week.id ? 'active' : ''}`}
                    key={index}
                  >
                    <span>{date}</span>
                    <button
                      className={`delete_week_button ${isDark ? 'dark-mode' : 'light-mode'}`}
                      onClick={(event) => showModalHandler(event, week.id)}
                      title='Delete Week'
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Modal title='Do you really wanna delete this week?' onYes={deleteWeekHandler} onNo={closeModalHandler} showModal={showModal} />
    </div>
  );
};
