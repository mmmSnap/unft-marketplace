import React, { useState } from 'react';
import styles from './MutipleSelectDropDown.module.sass';

const MutipleSelectDropDown = ({ options }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(value)) {
        return prevSelectedItems.filter((item) => item !== value);
      } else {
        return [...prevSelectedItems, value];
      }
    });
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {selectedItems.length > 0
          ? selectedItems.join(', ')
          : 'Select Items'}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <label key={option} className={styles.label}>
              <input
                type="checkbox"
                value={option}
                onChange={handleCheckboxChange}
                checked={selectedItems.includes(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MutipleSelectDropDown;
