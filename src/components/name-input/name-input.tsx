import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLocationParams } from '../../utils/types';

const validateName = (name: string) => {
    const re = /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/;
    return re.test(name);
};

export const NameInput = ({
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
    const [error, setError] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const location = useLocation() as unknown as TLocationParams;

    const validateField = (value: string) => {
        setError(!validateName(value));
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
            type='text'
            placeholder={location.pathname === ('/reset-password') ? 'Введите код из письма' : 'Имя'}
            onChange={onChange}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            errorText={location.pathname === ('/reset-password') ? '' : 'Имя введено не корректно'}
            size={size}
        />
    );
};