import React, { SyntheticEvent } from 'react';
import styles from './button.module.css';

export const Button: React.FC<{
    type?: 'login' | 'register' | 'forgot' | 'clear' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
}> = ({
    children,
    type = 'register',
    size = 'medium',
    onClick,
    disabled = false,
    name,
    htmlType,
}) => {
    const className = `${styles.button} ${
        type === 'register' 
            ? styles.button_type_register 
            : type === 'login'
            ? styles.button_type_login
            : type === 'forgot'
            ? styles.button_type_forgot
            : type === 'clear'
            ? styles.button_type_clear
            : styles.button_type_secondary
    } ${
        size === 'medium'
            ? styles.button_size_medium
            : size === 'small'
            ? styles.button_size_small
            : styles.button_size_large
    }`;

    return (
        <button
            type={htmlType}
            disabled={disabled}
            name={name}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
};