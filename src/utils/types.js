/* eslint-disable no-dupe-keys */
import PropTypes from "prop-types";

export const headerProperties = PropTypes.shape({
  isAppHeaderVisible: PropTypes.bool,
  handleToggle: PropTypes.func
});

export const ingredientsProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool,
  handleToggle: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  handleModalOpen: PropTypes.func,
  setTitle: PropTypes.func,
  setContent: PropTypes.func,
  handleCardClick: PropTypes.func
});

export const constructorProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool,
  handleToggle: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  handleModalOpen: PropTypes.func,
  setTitle: PropTypes.func,
  setContent: PropTypes.func,
});

export const cardProperties = PropTypes.shape({
  card: PropTypes.object,
  card: PropTypes.shape({
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
  }),
  isBurgerIngredientsVisible: PropTypes.bool,
  bun: PropTypes.func,
  bunTop: PropTypes.func,
  handleCardClick: PropTypes.func
});

export const listProperties = PropTypes.shape({
  children: PropTypes.element
});

export const mainProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool,
  isBurgerConstructorVisible: PropTypes.bool,
  handleToggle: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  handleModalOpen: PropTypes.func,
  setTitle: PropTypes.func,
  setContent: PropTypes.func,
  handleCardClick: PropTypes.func
});

export const menuProperties = PropTypes.shape({
  setIsNavigationMenuOpen: PropTypes.func
});

export const overlayProperties = PropTypes.shape({
  handleModalClose: PropTypes.func
});

export const modalProperties = PropTypes.shape({
  isModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
  title: PropTypes.bool,
  children: PropTypes.element,
});

export const ingredientProperties = PropTypes.shape({
  card: PropTypes.object,
  card: PropTypes.shape({
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
  })
});

export const orderProperties = PropTypes.shape({
  sum: PropTypes.object,
  sum: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    message: PropTypes.string,
    info: PropTypes.string
  })
});
