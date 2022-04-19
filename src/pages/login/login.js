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
        regEx: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        error: 'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы'
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
    setData({ email: '', password: '' });
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
          <span style={{ color: '#EE3465' }}>
            Что-то пошло не так. Попробуйте ещё раз.
          </span>
        }
        <Button type="login" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Войти 
        </Button> 
      </form>
      <div style={mobile ? { display: 'block' }  : { display: 'flex', justifyContent: 'center' }}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Вы - новый пользователь?</p>
        <Link className={styles.link} to='/register'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"} style={{ color: '#4C4CFF' }}>Зарегистрироваться</p>
        </Link>
      </div>
      <div style={mobile ? { display: 'block', marginTop: 20 }  : { display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <p className={mobile ? "text text_type_main-small text_color_inactive" : "text text_type_main-default text_color_inactive"}>Забыли пароль?</p>
        <Link className={styles.link} to='/forgot-password'>
          <p className={mobile ? "text text_type_main-small ml-2" : "text text_type_main-default ml-2"} style={{ color: '#4C4CFF' }}>Восстановить пароль</p>
        </Link>
      </div>   
    </div>
  );
}

export default Login;