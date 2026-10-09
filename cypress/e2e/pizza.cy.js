
describe('Pizza Sipariş Testleri', () => {
  it('İsim alanına yazı yazılabiliyor', () => {
    cy.visit('http://localhost:5173');

    cy.contains('ACIKTIM').click();

    cy.get('input[name="isim"]')
      .type('Baran')
      .should('have.value', 'Baran');
  });

  it('Birden fazla malzeme seçilebiliyor', () => {
    cy.visit('http://localhost:5173');

    cy.contains('ACIKTIM').click();

    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Domates"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    cy.get('input[type="checkbox"][value="Sucuk"]').check();

    cy.get('input[type="checkbox"]:checked')
      .should('have.length', 4);
  });

  it('Geçerli sipariş başarıyla tamamlanıyor', () => {
    cy.intercept('POST', 'https://reqres.in/api/pizza', {
      statusCode: 201,
      body: {
        id: 1,
        message: 'Sipariş alındı',
      },
    }).as('pizzaSiparisi');

    cy.visit('http://localhost:5173');

    cy.contains('ACIKTIM').click();

    cy.get('input[name="isim"]').type('Baran');

    cy.get('input[name="boyut"][value="Orta"]').check();

    cy.get('select[name="hamur"]').select('Normal');

    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Domates"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    cy.get('input[type="checkbox"][value="Sucuk"]').check();

    cy.contains('button', 'SİPARİŞ VER')
      .should('not.be.disabled')
      .click();

    cy.wait('@pizzaSiparisi');

    cy.contains('SİPARİŞİNİZ ALINDI!').should('be.visible');
    cy.contains('İsim: Baran').should('be.visible');
  });
});
