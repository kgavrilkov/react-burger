import { register, login, logout } from '../../utils/auth';
import { TUserData, TRegisterInitialState, TLoginInitialState } from '../../utils/types';
import { AppThunk, AppDispatch } from '../store';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const RESET: 'RESET' = 'RESET';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUserData;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IResetAction {
  readonly type: typeof RESET;
}

export type TAuthAction = IRegisterRequestAction | IRegisterSuccessAction | IRegisterFailedAction | 
ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction | ILogoutRequestAction | ILogoutSuccessAction | 
ILogoutFailedAction | IResetAction;

export const registerRequestAction = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST
});

export const registerSuccessAction = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED
});

export const loginRequestAction = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST
});

export const loginSuccessAction = (
  payload: TUserData
): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED
});

export const logoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
});

export const resetAction = (): IResetAction => ({
  type: RESET
});

export const registerAction: AppThunk = ({name, email, password}: TRegisterInitialState) => (dispatch: AppDispatch) => {
  dispatch(registerRequestAction());
  register({name, email, password})
    .then((res) => {
      if (res && res.success) {
        dispatch(registerSuccessAction());
        dispatch(resetAction());
      } else {
        dispatch(registerFailedAction());
      }
    })
    .catch(() => {
      dispatch(registerFailedAction());
    });
};

export const loginAction: AppThunk = ({email, password}: TLoginInitialState) => (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());
  login({email, password})
    .then((res) => {
      if (res && res.success) {
        dispatch(loginSuccessAction(res.user));
      } else {
        dispatch(loginFailedAction());
      }
    })
    .catch(() => {
      dispatch(loginFailedAction());
    });
};

export const logoutAction: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequestAction());
  logout()
    .then((res) => {
      if (res && res.success) {
        dispatch(logoutSuccessAction());
      } else {
        dispatch(logoutFailedAction());
      }
    })
    .catch(() => {
      dispatch(logoutFailedAction());
    });
};