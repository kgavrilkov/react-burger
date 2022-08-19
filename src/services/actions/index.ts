import { TAuthAction } from './auth';
import { TIngredientsAction } from './burger-ingredients';
import { TConstructorAction } from './constructor-ingredients';
import { TItemToViewAction } from './item-to-view';
import { TOrderToViewAction } from './order-to-view';
import { TOrderAction } from './order';
import { TPasswordAction } from './password';
import { TUserAction } from './user';
import { TWebSocketAction } from './wsActions';
import { TFeedAction } from './feed';
import { TOrdersAction } from './orders';
import { TOrderByNumberAction } from './order-by-number';

export type TActions = TAuthAction | TIngredientsAction | TConstructorAction | 
TItemToViewAction | TOrderToViewAction | TOrderAction | TPasswordAction |TUserAction | TWebSocketAction |
TFeedAction | TOrdersAction | TOrderByNumberAction;