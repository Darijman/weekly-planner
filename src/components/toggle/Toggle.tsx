import React from 'react';
import './toggle.css';

interface Props {
  handleChange: any;
  isChecked: boolean;
}

export const Toggle = ({ handleChange, isChecked }: Props) => {
  return (
    <div className='toggle_container'>
      <input type='checkbox' id='check' className='toggle' onChange={handleChange} checked={isChecked} />
      <label htmlFor='check'>Dark Mode</label>
    </div>
  );
};
