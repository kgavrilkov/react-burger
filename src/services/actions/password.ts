import { forgotPassword, resetPassword } from '../../utils/password';
import { TForgotPasswordInitialState, TResetPasswordInitialState } from '../../utils/types';
import { AppThunk } from '../store';

export const FORGOT_REQUEST: 'FORGOT_REQUEST' = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS: 'FORGOT_SUCCESS' = 'FORGOT_SUCCESS';
export const FORGOT_FAILED: 'FORGOT_FAILED' = 'FORGOT_FAILED';

export const RESET_REQUEST: 'RESET_REQUEST' = 'RESET_REQUEST';
export const RESET_SUCCESS: 'RESET_SUCCESS' = 'RESET_SUCCESS';
export const RESET_FAILED: 'RESET_FAILED' = 'RESET_FAILED';

export const CLEAR: 'CLEAR' = 'CLEAR';

export interface IForgotRequestAction {
  readonly type: typeof FORGOT_REQUEST;
}

export interface IForgotSuccessAction {
  readonly type: typeof FORGOT_SUCCESS;
}

export interface IForgotFailedAction {
  readonly type: typeof FORGOT_FAILED;
}

export interface IResetRequestAction {
  readonly type: typeof RESET_REQUEST;
}

export interface IResetSuccessAction {
  readonly type: typeof RESET_SUCCESS;
}

export interface IResetFailedAction {
  readonly type: typeof RESET_FAILED;
}

export interface IClearAction {
  readonly type: typeof CLEAR;
}

export type TPasswordAction = IForgotRequestAction | IForgotSuccessAction | IForgotFailedAction |
IResetRequestAction | IResetSuccessAction | IResetFailedAction | IClearAction;

export const forgotRequestAction = (): IForgotRequestAction => ({
  type: FORGOT_REQUEST
});

export const forgotSuccessAction = (): IForgotSuccessAction => ({
  type: FORGOT_SUCCESS
});

export const forgotFailedAction = (): IForgotFailedAction => ({
  type: FORGOT_FAILED
});

export const resetRequestAction = (): IResetRequestAction => ({
  type: RESET_REQUEST
});

export const resetSuccessAction = (): IResetSuccessAction => ({
  type: RESET_SUCCESS
});

export const resetFailedAction = (): IResetFailedAction => ({
  type: RESET_FAILED
});

export const clearAction = (): IClearAction => ({
  type: CLEAR
});

export const forgotPasswordAction: AppThunk = ({email}: TForgotPasswordInitialState) => (dispatch) => {
  dispatch(forgotRequestAction());
  forgotPassword({email})
    .then((res) => {
      if (res && res.success) {
        dispatch(forgotSuccessAction());
      } else {
        dispatch(forgotFailedAction());
      }
    })
    .catch(() => {
      dispatch(forgotFailedAction());
    });
};

export const resetPasswordAction: AppThunk = ({password, token}: TResetPasswordInitialState) => (dispatch) => {
  dispatch(resetRequestAction());
  resetPassword({password, token})
    .then((res) => {
      if (res && res.success) {
        dispatch(resetSuccessAction());
      } else if (!res && res!.success) {
        dispatch(resetFailedAction());
      } else {
        dispatch(clearAction());
      }
    })
    .catch(() => {
      dispatch(resetFailedAction());
    });
};