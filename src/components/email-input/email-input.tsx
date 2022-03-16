import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const EmailInput = ({
    value,
    onChange,
    name,
    size = 'default',
}: {
    value: string;
    name: string;
    size?: 'default' | 'small';
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}) => {

    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

    const validateField = (value: string) => {
        setError(!validateEmail(value));
    };

    const onFocus = () => {
        setError(false);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setError(false);
        }
    };

    return (
        <Input
            type='email'
            placeholder={location.pathname === ('/forgot-password') 
                        ? 'Укажите e-mail' 
                        : location.pathname === ('/profile')
                        ? 'Логин'
                        : 'E-mail'
            }
            onChange={onChange}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            errorText={'Некорректный e-mail'}
            size={size}
        />
    );
};