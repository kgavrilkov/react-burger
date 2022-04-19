/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { NameInput } from '../../components/name-input/name-input';
import { PasswordInput } from '../../components/password-input/password-input';
import { Button } from '../../components/button/button';
import { resetPasswordAction } from '../../services/actions/password.js';
import styles from './reset-password.module.css';

function ResetPassword() {
  const mobile = useMediaQuery({ query: `(max-width: 375px)` });
  
  const isMessageReceived = useSelector(store => store.password.isMessageReceived);
  const errorResetMessage = useSelector(store => store.password.errorResetMessage);
  const successResetMessage = useSelector(store => store.password.successResetMessage);

  const dispatch = useDispatch();

  const stateSchema = {
    password: { value: '', error: ''},
    token: { value: '', error: ''}
  };

  const validationStateSchema = {
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        error: 'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы'
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

  const [state, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);
  const [data, setData]=React.useState({ password: '', token: '' }); 

  const validateState = React.useCallback(() => {
    const hasErrorInState = Object.keys(validationStateSchema).some(key => {
      const isInputFieldRequired = validationStateSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationStateSchema]);

  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const onChange = React.useCallback(event => {
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

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPasswordAction(data));
    setData({ password: '', token: '' });
  };

  if (!isMessageReceived) {
    return <Redirect to='/forgot-password' />
  }
  
  return(
    <div className={styles.container}>
      <p className="text text_type_main-medium" style={mobile ? {maxWidth: 250, margin: 'auto' } : {maxWidth: 480 }}>Восстановление пароля</p>
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
          <span style={{ color: '#EE3465' }}>
            Что-то пошло не так. Попробуйте ещё раз.
          </span>
        }
        {successResetMessage && 
          <span style={{ color: '#EE3465' }}>
            Вы успешно восстановили пароль.
          </span>
        }
        <Button type="clear" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Сохранить 
        </Button> 
      </form>
      <div style={mobile ? { display: 'block' }  : { display: 'flex', justifyContent: 'center' }}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"} style={{ color: '#4C4CFF' }}>Войти</p>
        </Link>
      </div>
    </div>
  );
}

export default ResetPassword;