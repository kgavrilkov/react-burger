/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileNameInput } from '../../components/profile-name-input/profile-name-input';
import { ProfileEmailInput } from '../../components/profile-email-input/profile-email-input';
import { ProfilePasswordInput } from '../../components/profile-password-input/profile-password-input';
import { Button } from '../../components/button/button';
import { getUserAction, setUserAction } from '../../services/actions/user.js';
import { logoutAction } from '../../services/actions/auth.js';
import styles from './profile.module.css';

function Profile({match}) {
  const dispatch = useDispatch();

  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 375px)` });

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const successMessage = useSelector(store => store.currentUser.successMessage);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const nameRef = React.useRef(name);
  const emailRef = React.useRef(email);

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    nameRef.current = name;
    emailRef.current = email;
  }, [name, email]);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, []);

  const stateSchema = {
    name: { value: '', error: ''},
    email: { value: '', error: ''},
    password: { value: '', error: '' }
  };

  const validationStateSchema = {
    name: {
      required: false,
      validator: {
        regEx: /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/,
        error: 'Имя введено не корректно'
      },
    },
    email: {
      required: false,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: 'Некорректный e-mail'
      },
    },
    password: {
      required: false,
      validator: {
        regEx: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        error: 'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы'
      },
    },
  };

  const [state, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);

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

  const handleNameChange = React.useCallback(event => {
    setVisible(true);
    setIsDirty(true);

    const name = event.target.name;
    const value = event.target.value;

    setName(value); 

    let error = '';
    if (
      validationStateSchema.name.validator !== null &&
      typeof validationStateSchema.name.validator === 'object'
    ) {
      if (value && !validationStateSchema.name.validator.regEx.test(value)) {
        error = validationStateSchema.name.validator.error;
      }
    }
    
    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }, [validationStateSchema]);

  const handleEmailChange = React.useCallback(event => {
    setVisible(true);
    setIsDirty(true);

    const email = event.target.name;
    const value = event.target.value;

    setEmail(value); 

    let error = '';
    if (
      validationStateSchema.email.validator !== null &&
      typeof validationStateSchema.email.validator === 'object'
    ) {
      if (value && !validationStateSchema.email.validator.regEx.test(value)) {
        error = validationStateSchema.email.validator.error;
      }
    }

    setState(prevState => ({
      ...prevState,
      [email]: { value, error },
    })); 
  }, [validationStateSchema]);

  const handlePasswordChange = React.useCallback(event => {
    setVisible(true);
    setIsDirty(true);

    const password = event.target.name;
    const value = event.target.value;

    setPassword(value); 

    let error = '';
    if (
      validationStateSchema.password.validator !== null &&
      typeof validationStateSchema.password.validator === 'object'
    ) {
      if (value && !validationStateSchema.password.validator.regEx.test(value)) {
        error = validationStateSchema.password.validator.error;
      }
    }

    setState(prevState => ({
      ...prevState,
      [password]: { value, error },
    })); 
  }, [validationStateSchema]);

  React.useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(setUserAction({name, email, password}));
  };

  const onClick = () => {
    window.location.reload();
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return(
    <div className={tablet ? styles.box : styles.container}>
      {tablet
      ?
        <p className="text text_type_main-medium mb-6">Профиль</p>
      :
        <div className={styles.content}>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
            Профиль
          </NavLink>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile/orders'>
            История заказов
          </NavLink>
          <Button type="profile" size='profile' onClick={logout}>
            Выход
          </Button>
          <p className="text text_type_main-default text_color_inactive" style={{ gridRow: 5, alignSelf: 'end' }}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      }  
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit} noValidate>
          <div className={styles.form}>
            <ProfileNameInput
              onChange={handleNameChange}
              value={name}
              name={'name'}
              size={mobile ? 'small' : 'default'}
            />
            <ProfileEmailInput
              onChange={handleEmailChange}
              value={email}
              name={'email'}
              size={mobile ? 'small' : 'default'}
            />
            <ProfilePasswordInput
              onChange={handlePasswordChange}
              value={password}
              name={'password'}
              size={mobile ? 'small' : 'default'}
            />
            {successMessage && 
              <span style={{ color: '#EE3465', textAlign: 'center' }}>
                Вы успешно обновили информацию о пользователе.
              </span>
            }
            {visible && 
              <Button type="clear" htmlType='submit' size={mobile ? 'small' : 'medium'} disabled={disable}>
                Сохранить
              </Button>
            }
          </div>
          <div style={{ margin: 'auto' }}>
            {visible && 
              <Button type="secondary" htmlType='reset' size={mobile ? 'small' : 'medium'} onClick={onClick}>
                Отмена
              </Button>
            }
          </div>
        </form>
    </div>
  );
}

export default Profile;