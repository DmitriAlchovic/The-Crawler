import React, { useState } from 'react';
import chevron from '../../assets/chevron.svg';
import styles from './Dropdown.module.sass';

interface DropdownProps {
  children: React.ReactNode;
  hasChildrenClose: boolean;
}

export default function Dropdown({
  children,
  hasChildrenClose,
}: DropdownProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={styles['drop-container']}>
      <div
        className={styles['drop-btn']}
        aria-label="label"
        tabIndex={-1}
        role="button"
        onKeyDown={() => {}}
        onClick={() => {
          setIsShown(!isShown);
        }}
      >
        <span className={isShown ? styles['chevron-drop'] : styles.chevron}>
          <img alt="chevron" src={chevron} />
        </span>
      </div>

      <div>
        {isShown && (
          <div
            aria-label="label"
            tabIndex={-1}
            role="button"
            onKeyDown={() => {}}
            className={styles['drop-background']}
            onClick={() => {
              setIsShown(!isShown);
            }}
          />
        )}
        <div
          className={isShown ? styles['children-container'] : styles.hidden}
          aria-label="label"
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
          onClick={() => {
            if (hasChildrenClose) {
              setIsShown(!isShown);
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
