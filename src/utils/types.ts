export type THeader = {
  isAppHeaderVisible: boolean;
  handleToggle: () => void;
};

export type TLocationParams = {
  pathname: string;
  state: { from: Location, background: string };
  search: string;
  hash: string;
  key: string;
};

export type TBurgerConstructor = Omit<THeader, 'isAppHeaderVisible'> & { isBurgerIngredientsVisible: boolean; };

export type TIngredient = {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
};

export type TBurgerIngredients = Omit<TBurgerConstructor, 'handleToggle'> & { handleModalOpen: (handleCardOpen: any) => void; };

export type TCard = {
  card: TIngredient;
  isBurgerIngredientsVisible: boolean;
  text: string;
  onClick: () => void;
};

export type TDraggable = {
  card: TIngredient;
  index: number;
  id: any;
  handleDeleteClick: (item: TIngredient & { key?: any; }) => void;
  moveCard: (hoverIndex: number, dragIndex: number) => void;
};

export type TIngredientDetails = {
  card: TIngredient;
};

export type TListElement = TDraggable & { isBurgerIngredientsVisible: boolean; };

export type TMain = TBurgerConstructor & { isBurgerConstructorVisible: boolean; handleModalOpen: () => void;  };

export type TModal = {
  isModalVisible: boolean;
  handleModalClose: () => void;
  title: string;
};

export type TModalOverlay = Omit<TModal, 'isModalVisible' | 'title'>;

export type TNavigationMenu = {
  setIsNavigationMenuOpen: (arg0: boolean) => void;
};

export type TSum = {
  subtitle: string;
  message: string;
  info: string;
};

export type TOrderDetails = {
  sum: TSum;
  orderNumber: number;
};

export type TTotalPrice = {
  isBurgerConstructorVisible: boolean;
  handleToggle: () => void;
  handleModalOpen: (getRequestNumber: any) => void;
};

export type TRegisterStateSchema = {
  name: { value: string, error: string };
  email: { value: string, error: string };
  password: { value: string, error: string };
  [key: string]: any;
};

export type TRegisterInitialState = {
  name: string;
  email: string;
  password: string;
};

export type TRegisterValidationStateSchema = {
  name: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  email: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  password: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  [key: string]: any;
};

export type TLoginStateSchema = {
  email: { value: string, error: string };
  password: { value: string, error: string };
  [key: string]: any;
};

export type TLoginInitialState = Omit<TRegisterInitialState, 'name'>;

export type TLoginValidationStateSchema = {
  email: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  password: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  [key: string]: any;
};

export type TForgotPasswordStateSchema = {
  email: { value: string, error: string };
  [key: string]: any;
};

export type TForgotPasswordInitialState = Omit<TLoginInitialState, 'password'>;

export type TForgotPasswordValidationStateSchema = {
  email: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  [key: string]: any;
};

export type TResetPasswordStateSchema = {
  password: { value: string, error: string };
  token: { value: string, error: string };
  [key: string]: any;
};

export type TResetPasswordInitialState = {
  password: string;
  token: string;
};

export type TResetPasswordValidationStateSchema = {
  password: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  token: {
    required: boolean;
    validator: {
      regEx: RegExp;
      error: string;
    };
  };
  [key: string]: any;
};

export type TUserInfo = TRegisterInitialState;

export type TUser = {
  user: {
    name: string;
    email: string;
  };
};

export type TRegister = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    name: string;
    email: string;
  };
};

export type TLogin = TRegister;

export type TRefreshToken = Omit<TRegister, 'user'>;

export type TLogout = {
  message: string;
  success: boolean;
};

export type TForgotPassword = TLogout;

export type TResetPassword = TForgotPassword;


