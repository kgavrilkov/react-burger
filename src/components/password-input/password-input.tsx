import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const validatePassword = (email: string) => {
    const re = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    return re.test(email);
};

export const PasswordInput = ({
    value,
    onChange,
    name,
    size,
}: {
    value: string;
    name: string;
    size?: 'default' | 'small';
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}) => {
    const [visible, setVisible] = useState(false);

    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

    const onIconClick = () => {
        setVisible(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const validateField = (value: string) => {
        setError(!validatePassword(value));
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
        setVisible(false);
    };

    return (
        <Input
            type={visible ? 'text' : 'password'}
            placeholder={location.pathname === ('/reset-password') ? 'Введите новый пароль' : 'Пароль'}
            onChange={onChange}
            icon={visible ? 'HideIcon' : 'ShowIcon'}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            onIconClick={onIconClick}
            errorText={'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы'}
            size={size === 'small' ? 'small' : 'default'}
        />
    );
};