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

export type TIngredientToDelete = TIngredient & { key?: any };

export type TIngredients = {
  success: boolean;
  data: Array<TIngredient>;
};

export type TBurgerIngredients = Omit<TBurgerConstructor, 'handleToggle'>;

export type TCard = {
  card: TIngredient;
  isBurgerIngredientsVisible: boolean;
  text: string;
};

export type TDraggable = {
  card: TIngredient;
  index: number;
  id: any;
  handleDeleteClick: (item: TIngredient & { key?: any; }) => void;
  moveCard: (hoverIndex: number, dragIndex: number) => void;
};

export type TListElement = TDraggable & { isBurgerIngredientsVisible: boolean; };

export type TMain = TBurgerConstructor & { isBurgerConstructorVisible: boolean; };

export type TModal = {
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
  success: boolean;
  user: {
    name: string;
    email: string;
  };
};

export type TUserData = {
  name: string;
  email: string;
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

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  }
};

export type TItem = {
  _id: string,
  status: string,
  number: string,
  date?: string,
  name: string,
  ingredients: {
    link: string,
    name: string,
    _id: string,
    type?: string,
    price: number
  }[]
};

export type TItemIngredient = {
  link: string,
  name: string,
  _id: string,
  type?: string,
  price: number
};

export type TCardFeed = {
  card: TOrderFeed;
};

export type TFeed = {
  isOrdersVisible: boolean;
  isStatsVisible: boolean;
  handleOrdersToggle: () => void;
  handleStatsToggle: () => void;
};

export type TMainFeed = Omit<TFeed, 'handleOrdersToggle' | 'handleStatsToggle'>;

export type TFeedOrder = TCardFeed;

export type TTabFeed = {
  handleOrdersToggle: () => void;
  handleStatsToggle: () => void;
};

export type TOrderFeed = {
  ingredients: string[],
  _id: string,
  name: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
};

export type TOrdersFeed = {
  data: {
    orders: ReadonlyArray<TOrderFeed>,
    success: boolean,
    total: number,
    totalToday: number
  }
  timestamp: number
};

export type TOrderByNumber = {
  ingredients: string[],
  _id: string,
  name: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  owner: string
};

export type TOrdersByNumber = {
  orders: ReadonlyArray<TOrderByNumber>,
  success: boolean;
};

