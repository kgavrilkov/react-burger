import React, { useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return re.test(password);
};

export const ProfilePasswordInput = ({
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
    const [fieldDisabled, setDisabled] = useState<boolean>(true);

    const [error, setError] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        setDisabled(false);
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
        setDisabled(true);
    };

    return (
        <Input
            type='password'
            placeholder='Пароль'
            onChange={onChange}
            icon={fieldDisabled ? 'EditIcon' : 'CloseIcon'}
            value={value}
            ref={inputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            error={error}
            disabled={fieldDisabled}
            onIconClick={onIconClick}
            errorText={'Пароль должен содержать не менее 8 символов, как минимум: 1 заглавную латинскую букву, 1 специальный символ, 1 цифру и 1 строчную латинскую букву'}
            size={size === 'small' ? 'small' : 'default'}
        />
    );
};