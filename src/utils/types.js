import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string
});

export const sumType = PropTypes.shape({
  subtitle: PropTypes.string,
  message: PropTypes.string,
  info: PropTypes.string
});

export const headerProperties = PropTypes.shape({
  isAppHeaderVisible: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired
});

export const ingredientsProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
});

export const constructorProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  storeOrder: PropTypes.func.isRequired
});

export const cardProperties = PropTypes.shape({
  card: ingredientType.isRequired,
  isBurgerIngredientsVisible: PropTypes.bool.isRequired,
  bun: PropTypes.func.isRequired,
  bunTop: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired
});

export const listProperties = PropTypes.shape({
  children: PropTypes.element.isRequired
});

export const mainProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool.isRequired,
  isBurgerConstructorVisible: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  storeOrder: PropTypes.func.isRequired
});

export const menuProperties = PropTypes.shape({
  setIsNavigationMenuOpen: PropTypes.func.isRequired
});

export const overlayProperties = PropTypes.shape({
  handleModalClose: PropTypes.func.isRequired
});

export const modalProperties = PropTypes.shape({
  isModalVisible: PropTypes.bool.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  title: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
});

export const ingredientProperties = PropTypes.shape({
  card: ingredientType.isRequired
});

export const orderProperties = PropTypes.shape({
  sum: sumType.isRequired,
  orderNumber: PropTypes.number.isRequired
});
