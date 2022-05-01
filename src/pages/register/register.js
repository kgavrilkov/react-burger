/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { NameInput } from '../../components/name-input/name-input';
import { EmailInput } from '../../components/email-input/email-input';
import { PasswordInput } from '../../components/password-input/password-input';
import { Button } from '../../components/button/button';
import { registerAction } from '../../services/actions/auth.js';
import styles from './register.module.css';

function Register() {
  const mobile = useMediaQuery({ query: `(max-width: 375px)` });

  const registered = useSelector(store => store.auth.registered);
  const errorRegisterMessage = useSelector(store => store.auth.errorRegisterMessage);
 
  const dispatch = useDispatch();

  const stateSchema = {
    name: { value: '', error: ''},
    email: { value: '', error: ''},
    password: { value: '', error: ''},
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/,
        error: 'Имя введено не корректно'
      },
    },
    email: {
      required: true,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: 'Некорректный e-mail'
      },
    },
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        error: 'Пароль должен содержать не менее 8 символов, как минимум: 1 заглавную латинскую букву, 1 специальный символ, 1 цифру и 1 строчную латинскую букву'
      },
    },
  };

  const [state, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);
  const [data, setData]=React.useState({ name: '', email: '', password: '' }); 

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
    dispatch(registerAction(data));
  };

  if (registered) {
    return <Redirect to='/login' />
  }

  return(
    <div className={styles.container}>
      <p className="text text_type_main-medium">Регистрация</p>
      <form className={styles.content} onSubmit={onSubmit} noValidate>
        <NameInput
          onChange={onChange}
          value={data.name}
          name={'name'}
          size={mobile ? 'small' : 'default'}
         />
        <EmailInput
          onChange={onChange}
          value={data.email}
          name={'email'}
          size={mobile ? 'small' : 'default'}
         />
        <PasswordInput
          onChange={onChange}
          value={data.password}
          name={'password'}
          size={mobile ? 'small' : 'default'}
        />
        {errorRegisterMessage && 
          <span className={styles.span}>
            Что-то пошло не так. Попробуйте ещё раз.
          </span>
        }
        <Button type="register" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.box}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Уже зарегистрированы?</p>
        <Link className={styles.link} to='/login'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"}>Войти</p>
        </Link>
      </div>   
    </div>
  );
}

export default Register;