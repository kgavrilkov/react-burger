import { getUserInfo, setUserInfo } from '../../utils/api';
import { TUserData, TUserInfo } from '../../utils/types';
import { AppThunk } from '../store';

export const GET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILED: 'GET_USER_INFO_FAILED' = 'GET_USER_INFO_FAILED';

export const SET_USER_INFO: 'SET_USER_INFO' = 'SET_USER_INFO';
export const SET_USER_INFO_SUCCESS: 'SET_USER_INFO_SUCCESS' = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAILED: 'SET_USER_INFO_FAILED' = 'SET_USER_INFO_FAILED';

export const DELETE: 'DELETE' = 'DELETE';

export interface IGetUserInfoAction {
  readonly type: typeof GET_USER_INFO;
}

export interface IGetUserInfoSuccessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly payload: TUserData;
}

export interface IGetUserInfoFailedAction {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface ISetUserInfoAction {
  readonly type: typeof SET_USER_INFO;
}

export interface ISetUserInfoSuccessAction {
  readonly type: typeof SET_USER_INFO_SUCCESS;
  readonly payload: TUserData;
}

export interface ISetUserInfoFailedAction {
  readonly type: typeof SET_USER_INFO_FAILED;
}

export interface IDeleteAction {
  readonly type: typeof DELETE;
}

export type TUserAction = IGetUserInfoAction | IGetUserInfoSuccessAction | IGetUserInfoFailedAction |
ISetUserInfoAction | ISetUserInfoSuccessAction | ISetUserInfoFailedAction | IDeleteAction;

export const getUserInfoAction = (): IGetUserInfoAction => ({
  type: GET_USER_INFO
});

export const getUserInfoSuccessAction = (
  payload: TUserData
): IGetUserInfoSuccessAction => ({
  type: GET_USER_INFO_SUCCESS,
  payload
});

export const getUserInfoFailedAction = (): IGetUserInfoFailedAction => ({
  type: GET_USER_INFO_FAILED
});

export const setUserInfoAction = (): ISetUserInfoAction => ({
  type: SET_USER_INFO
});

export const setUserInfoSuccessAction = (
  payload: TUserData
): ISetUserInfoSuccessAction => ({
  type: SET_USER_INFO_SUCCESS,
  payload
});

export const setUserInfoFailedAction = (): ISetUserInfoFailedAction => ({
  type: SET_USER_INFO_FAILED
});

export const deleteAction = (): IDeleteAction => ({
  type: DELETE
});

export const getUserAction: AppThunk = () => (dispatch) => {
  dispatch(getUserInfoAction());
  getUserInfo()
    .then((res) => {
      if (res && res.success) {
        dispatch(getUserInfoSuccessAction(res.user));
      } else {
        dispatch(getUserInfoFailedAction());
      }
    })
    .catch(() => {
      dispatch(getUserInfoFailedAction());
    });
};

export const setUserAction: AppThunk = ({name, email, password}: TUserInfo) => (dispatch) => {
  dispatch(setUserInfoAction());
  setUserInfo({name, email, password})
    .then((res) => {
      if (res && res.success) {
        dispatch(setUserInfoSuccessAction(res.user));
      } else if (!res && res!.success) {
        dispatch(setUserInfoFailedAction());
      } else {
        dispatch(deleteAction());
      }
    })
    .catch(() => {
      dispatch(setUserInfoFailedAction());
    });
};