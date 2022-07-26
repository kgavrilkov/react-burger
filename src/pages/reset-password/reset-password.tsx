/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useCallback, useEffect, FormEvent } from "react";
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from '../../services/hooks';
import { NameInput } from '../../components/name-input/name-input';
import { PasswordInput } from '../../components/password-input/password-input';
import { Button } from '../../components/button/button';
import { resetPasswordAction, clearAction } from '../../services/actions/password';
import styles from './reset-password.module.css';
import { TResetPasswordStateSchema, TResetPasswordValidationStateSchema, TResetPasswordInitialState }  from '../../utils/types';
import { TRootState } from '../../services/store';

const ResetPassword: FC = () => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 375px)` });
  
  const isResetMessageReceived = useSelector((store: TRootState) => store.password.isResetMessageReceived);
  const isMessageReceived = useSelector((store: TRootState) => store.password.isMessageReceived);
  const errorResetMessage = useSelector((store: TRootState) => store.password.errorResetMessage);
  const successResetMessage = useSelector((store: TRootState) => store.password.successResetMessage);

  const dispatch = useDispatch();
  const history = useHistory();

  const stateSchema: TResetPasswordStateSchema = {
    password: { value: '', error: ''},
    token: { value: '', error: ''}
  };

  const validationStateSchema: TResetPasswordValidationStateSchema = {
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        error: 'Пароль должен содержать не менее 8 символов, как минимум: 1 заглавную латинскую букву, 1 специальный символ, 1 цифру и 1 строчную латинскую букву'
      }
    },
    token: {
      required: true,
      validator: {
        regEx: /^(?=.*[0-9])(?=.*[a-z])(?=.*[-]).{3,}$/,
        error: 'Имя введено не корректно'
      },
    }
  };

  const [state, setState] = useState<TResetPasswordStateSchema>(stateSchema);
  const [disable, setDisable] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [data, setData] = useState<TResetPasswordInitialState>({ password: '', token: '' }); 

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationStateSchema).some(key => {
      const isInputFieldRequired = validationStateSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationStateSchema]);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const onChange = useCallback(event => {
    setIsDirty(true);
    
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ 
      ...data, 
      [name]: value, 
    })); 

    let error = '';
    
    if (
      validationStateSchema[name].validator !== null &&
      typeof validationStateSchema[name].validator === 'object'
    ) {
      if (value && !validationStateSchema[name].validator.regEx.test(value)) {
        error = validationStateSchema[name].validator.error;
      }
    }
    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }, [validationStateSchema]);

  const onSubmit = (evt: FormEvent<EventTarget>): void => {
    evt.preventDefault();
    dispatch(resetPasswordAction(data));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isResetMessageReceived) {
        dispatch(clearAction());
        localStorage.removeItem('resetMessage');
        history.push('/login');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isResetMessageReceived]);

  if (!isMessageReceived) {
    return <Redirect to='/forgot-password' />
  }
  
  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
      <form className={styles.content} onSubmit={onSubmit} noValidate>
        <PasswordInput
          onChange={onChange}
          value={data.password}
          name={'password'}
          size={mobile ? 'small' : 'default'}
        />
        <NameInput
          onChange={onChange}
          value={data.token}
          name={'token'}
          size={mobile ? 'small' : 'default'}
        />
        {errorResetMessage && 
          <span className={styles.span}>
            Что-то пошло не так. Попробуйте ещё раз.
          </span>
        }
        {successResetMessage && 
          <span className={styles.span}>
            Вы успешно восстановили пароль.
          </span>
        }
        <Button type="clear" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Сохранить 
        </Button> 
      </form>
      <div className={styles.box}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"}>Войти</p>
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;