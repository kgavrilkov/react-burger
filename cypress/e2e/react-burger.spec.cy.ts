describe('constructor functionality', () => {
  before(() => {
    cy.login('kgavrilkov@yandex.ru', 'ABQR@888debt');
    cy.get('[data-cy="title1"]').should('have.text', 'Вход');
    cy.saveLocalStorage();
  });

  it('should visit main page', () => {
    cy.visit('/');
    cy.url().should('eq', 'http://localhost:3000/');
    cy.wait(2000);
  });

  it('should open ingredient popup after ingredient card click', () => {
    cy.get('[data-cy="link"]').first().click();
    cy.get('[data-cy="title"]').should('have.text', 'Детали ингредиента');
    cy.wait(2000);
  });

  it('should display ingredient data in the popup', () => {
    cy.get('[data-cy="image"]').first().invoke('attr', 'src').should('eq', 'https://code.s3.yandex.net/react/code/bun-02.png');
    cy.get('[data-cy="name"]').first().should('have.text', 'Краторная булка N-200i');
    cy.get('[data-cy="calories"]').should('have.text', 'Калории,кк');
    cy.get('[data-cy="calorie"]').should('have.text', '420');
    cy.get('[data-cy="proteins"]').should('have.text', 'Белки, г');
    cy.get('[data-cy="protein"]').should('have.text', '80');
    cy.get('[data-cy="fats"]').should('have.text', 'Жиры, г');
    cy.get('[data-cy="fat"]').should('have.text', '24');
    cy.get('[data-cy="carbohydrates"]').should('have.text', 'Углеводы, г');
    cy.get('[data-cy="carbohydrate"]').should('have.text', '53');
  });

  it('should close ingredient popup after close button click', () => {
    cy.get('[data-cy="button"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.wait(2000);
  });

  it('should drag ingredient to the burger-constructor', () => {
    cy.get('[data-cy="ingredient"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('[data-cy="constructor"]').trigger('drop');
    cy.wait(2000);

    cy.get('[data-cy="ingredient"]').contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
    cy.get('[data-cy="constructor"]').trigger('drop');

    cy.get('[data-cy="constructor"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="constructor"]').contains('Биокотлета из марсианской Магнолии');
    cy.wait(2000);
  });

  it('should open order popup after order button click', () => {
    cy.get('[data-cy="button2"]').click();
    cy.get('[data-cy="title2"]').should('have.text', 'Загрузка ...');
    cy.wait(2000);
    cy.get('[data-cy="title3"]').should('not.be.empty');
  });

  it('should close order popup after close button click', () => {
    cy.get('[data-cy="button"]').click();
    cy.get('[data-cy="constructor"]').contains('Выберите булку');
    cy.get('[data-cy="constructor"]').contains('Выберите начинку'); 
  });
})