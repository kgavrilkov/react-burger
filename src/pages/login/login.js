/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { EmailInput } from '../../components/email-input/email-input';
import { PasswordInput } from '../../components/password-input/password-input';
import { Button } from '../../components/button/button';
import { loginAction } from '../../services/actions/auth.js';
import styles from './login.module.css';

function Login() {
  const mobile = useMediaQuery({ query: `(max-width: 375px)` });

  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const errorLoginMessage = useSelector(store => store.auth.errorLoginMessage);

  const dispatch = useDispatch();
  const { state } = useLocation();

  const stateSchema = {
    email: { value: '', error: ''},
    password: { value: '', error: ''},
  };

  const validationStateSchema = {
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

  const [states, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);
  const [data, setData]=React.useState({ email: '', password: '' }); 

  const validateState = React.useCallback(() => {
    const hasErrorInState = Object.keys(validationStateSchema).some(key => {
      const isInputFieldRequired = validationStateSchema[key].required;
      const stateValue = states[key].value;
      const stateError = states[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [states, validationStateSchema]);

  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [states, isDirty, validateState]);

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
    dispatch(loginAction(data));
  };

  if (isLoggedIn) {
    return (
      <Redirect to={ state?.from || '/' }/>
    );
  }

  return(
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <form className={styles.content}  onSubmit={onSubmit} noValidate>
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
        {errorLoginMessage && 
          <span className={styles.span}>
            Что-то пошло не так. Попробуйте ещё раз.
          </span>
        }
        <Button type="login" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Войти 
        </Button> 
      </form>
      <div className={styles.box}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Вы - новый пользователь?</p>
        <Link className={styles.link} to='/register'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"}>Зарегистрироваться</p>
        </Link>
      </div>
      <div className={styles.unit}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Забыли пароль?</p>
        <Link className={styles.link} to='/forgot-password'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"}>Восстановить пароль</p>
        </Link>
      </div>   
    </div>
  );
}

export default Login;