/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileNameInput } from '../../components/profile-name-input/profile-name-input';
import { ProfileEmailInput } from '../../components/profile-email-input/profile-email-input';
import { ProfilePasswordInput } from '../../components/profile-password-input/profile-password-input';
import { Button } from '../../components/button/button';
import { getUserAction, setUserAction, DELETE } from '../../services/actions/user.js';
import { logoutAction } from '../../services/actions/auth.js';
import styles from './profile.module.css';
import { TRegisterStateSchema, TRegisterValidationStateSchema } from '../../utils/types';

const Profile: FC = () => {
  const dispatch = useDispatch();

  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  const currentUser = JSON.parse(localStorage.getItem('user')!);  
  const successMessage = useSelector((store: any) => store.currentUser.successMessage);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const nameRef = useRef<string>(name);
  const emailRef = useRef<string>(email);

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    nameRef.current = name;
    emailRef.current = email;
  }, [name, email]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, []);

  const stateSchema: TRegisterStateSchema = {
    name: { value: '', error: ''},
    email: { value: '', error: ''},
    password: { value: '', error: '' }
  };

  const validationStateSchema: TRegisterValidationStateSchema = {
    name: {
      required: false,
      validator: {
        regEx: /^[a-zA-Z??-????-??????'][a-zA-Z-??-????-??????' ]+[a-zA-Z??-????-??????']?$/,
        error: '?????? ?????????????? ???? ??????????????????'
      },
    },
    email: {
      required: false,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: '???????????????????????? e-mail'
      },
    },
    password: {
      required: false,
      validator: {
        regEx: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        error: '???????????? ???????????? ?????????????????? ???? ?????????? 8 ????????????????, ?????? ??????????????: 1 ?????????????????? ?????????????????? ??????????, 1 ?????????????????????? ????????????, 1 ?????????? ?? 1 ???????????????? ?????????????????? ??????????'
      },
    },
  };

  const [state, setState] = useState<TRegisterStateSchema>(stateSchema);
  const [disable, setDisable] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);

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

  const handleNameChange = useCallback(event => {
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

  const handleEmailChange = useCallback(event => {
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

  const handlePasswordChange = useCallback(event => {
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

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const onSubmit = (evt: FormEvent<EventTarget>): void => {
    evt.preventDefault();
    dispatch(setUserAction({name, email, password}));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUser) {
        dispatch({
          type: DELETE
        });
        setVisible(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentUser]);

  const onClick = () => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setPassword('');
    setVisible(false);
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
        <p className="text text_type_main-medium mb-6">??????????????</p>
      :
        <div className={styles.content}>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile'>
            ??????????????
          </NavLink>
          <NavLink className={styles.link} activeClassName={styles.active} to='/profile/orders'>
            ?????????????? ??????????????
          </NavLink>
          <Button type="profile" size='profile' onClick={logout}>
            ??????????
          </Button>
          <div className={styles.wrapper}>
            <p className="text text_type_main-default text_color_inactive">
              ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
            </p>
          </div>
        </div>
      }  
        <form className={styles.frame} onSubmit={onSubmit} noValidate>
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
              <span className={styles.span}>
                ???? ?????????????? ???????????????? ???????????????????? ?? ????????????????????????.
              </span>
            }
            {visible && 
              <Button type="clear" htmlType='submit' size={mobile ? 'small' : 'medium'} disabled={disable}>
                ??????????????????
              </Button>
            }
          </div>
          <div className={styles.button}>
            {visible && 
              <Button type="secondary" htmlType='reset' size={mobile ? 'small' : 'medium'} onClick={onClick}>
                ????????????
              </Button>
            }
          </div>
        </form>
    </div>
  );
}

export default Profile;