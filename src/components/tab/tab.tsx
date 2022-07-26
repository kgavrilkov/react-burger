import React from 'react';
import { useMediaQuery } from 'react-responsive';
import tab from './tab.module.css';

export const Tab: React.FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
}> = ({ active, value, children, onClick: handleClick }) => {
    const className = `${tab.tab} ${active ? tab.tab_type_current : ''}`;
    const onClick = React.useCallback(() => {
        if (typeof handleClick === 'function') {
            handleClick(value);
        }
    }, [handleClick, value]);

    const mobile: boolean = useMediaQuery({ query: `(max-width: 630px)` });

    return (
        <>
         {mobile 
          ?
          <div className={`${className} pt-4 pr-7 pb-4 pl-7 noselect`} onClick={onClick}>
             <span className="text text_type_main-default">{children}</span>
          </div>
          :
          <div className={`${className} pt-4 pr-10 pb-4 pl-10 noselect`} onClick={onClick}>
             <span className="text text_type_main-default">{children}</span>
          </div>  
          }
        </>
    );
};