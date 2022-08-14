/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useCallback, useEffect, FormEvent } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from '../../services/hooks';
import { EmailInput } from '../../components/email-input/email-input';
import { Button } from '../../components/button/button';
import { forgotPasswordAction } from '../../services/actions/password';
import styles from './forgot-password.module.css';
import { TForgotPasswordStateSchema, TForgotPasswordValidationStateSchema, TForgotPasswordInitialState }  from '../../utils/types';

const ForgotPassword: FC = () => {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 375px)` });

  const isMessageReceived = useSelector((store) => store.password.isMessageReceived);
  const successForgotMessage = useSelector((store) => store.password.successForgotMessage);

  const dispatch = useDispatch();
  const history = useHistory();

  const stateSchema: TForgotPasswordStateSchema = {
    email: { value: '', error: ''},
  };

  const validationStateSchema: TForgotPasswordValidationStateSchema = {
    email: {
      required: true,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: 'Некорректный e-mail'
      }
    }
  };

  const [state, setState] = useState<TForgotPasswordStateSchema>(stateSchema);
  const [disable, setDisable] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [data, setData] = useState<TForgotPasswordInitialState>({ email: '' }); 

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
    dispatch(forgotPasswordAction(data));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMessageReceived) {
        localStorage.removeItem('message');
        history.push('/reset-password');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isMessageReceived]);

  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
      </div>
      <form className={styles.content} onSubmit={onSubmit} noValidate>
        <EmailInput
          onChange={onChange}
          value={data.email}
          name={'email'}
          size={mobile ? 'small' : 'default'}
        />
        {successForgotMessage && 
          <span className={styles.span}>
            На введённый email пришёл код для восстановления пароля.
          </span>
        }
        <Button type="forgot" size={mobile ? 'small' : 'medium'} disabled={disable}>
          Восстановить 
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

export default ForgotPassword;