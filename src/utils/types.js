import PropTypes from "prop-types";

export const headerProperties = PropTypes.shape({
  isAppHeaderVisible: PropTypes.bool,
  handleToggle: PropTypes.func
});

export const ingredientsProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool,
  handleToggle: PropTypes.func,
  cards: PropTypes.array
});

export const cardProperties = PropTypes.shape({
  card: PropTypes.object,
  isBurgerIngredientsVisible: PropTypes.bool,
  bun: PropTypes.func,
  bunTop: PropTypes.func
});

export const listProperties = PropTypes.shape({
  children: PropTypes.element
});

export const mainProperties = PropTypes.shape({
  isBurgerIngredientsVisible: PropTypes.bool,
  isBurgerConstructorVisible: PropTypes.bool,
  handleToggle: PropTypes.func,
  cards: PropTypes.array
});

export const menuProperties = PropTypes.shape({
  setIsNavigationMenuOpen: PropTypes.func
});
