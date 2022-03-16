import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ProfileNameInput } from '../../components/profile-name-input/profile-name-input';
import { ProfileEmailInput } from '../../components/profile-email-input/profile-email-input';
import { ProfilePasswordInput } from '../../components/profile-password-input/profile-password-input';
import { Button } from '../../components/button/button';
import styles from './profile.module.css';

function Profile() {
  const [data, setData] = React.useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });
  const mobile = useMediaQuery({ query: `(max-width: 375px)` });

  const onChange = React.useCallback(evt => {
    setVisible(true);
    
    const name = evt.target.name;
    const value = evt.target.value;

    setData(data => ({ 
      ...data, 
      [name]: value, 
    })); 
  }, []);

  const onSubmit = (evt) => {
    //evt.preventDefault();
  };

  const onClick = () => {
    setData('');
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
          <NavLink className={styles.link} activeClassName={styles.active} exact to='/'>
            Выход
          </NavLink>
          <p className="text text_type_main-default text_color_inactive" style={{ gridRow: 5, alignSelf: 'end' }}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      }  
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit} noValidate>
          <div className={styles.form}>
            <ProfileNameInput
              onChange={onChange}
              value={data.name}
              name={'name'}
              size={mobile ? 'small' : 'default'}
            />
            <ProfileEmailInput
              onChange={onChange}
              value={data.email}
              name={'email'}
              size={mobile ? 'small' : 'default'}
            />
            <ProfilePasswordInput
              onChange={onChange}
              value={data.password}
              name={'password'}
              size={mobile ? 'small' : 'default'}
            />
            {errorMessage && 
              <span style={{ color: '#EE3465', margin: 'auto' }}>
                Что-то пошло не так. Попробуйте ещё раз.
              </span>
            }
            {visible && 
              <Button type="clear" size={mobile ? 'small' : 'medium'}>
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