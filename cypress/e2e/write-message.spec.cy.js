describe('Write message to user', () => {
    beforeEach(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage()
        cy.intercept('https://web.telegram.org').as("telegram");
        cy.visit("https://web.telegram.org").wait('@telegram');
        cy.wait(10000)
        cy.on("uncaught:exception", (er) => console.log(er))
        cy.window().then(win => {
            expect(win.localStorage.getItem("user_auth")).to.exist;
        })
    })
    it('passes', () => {
        const chatButton = cy.get('.ListItem-button[href="#936012940"]');
        chatButton.should('exist');
        chatButton.click();

        const messageText = "Тестовое сообщение";
        const inputContent = cy.get("#editable-message-text");
        const input = cy.get('#message-input-text').should("exist");
        input.click().type(messageText);

        inputContent.should("contain.text", messageText);

        const sendButton = cy.get(".send")
            .should("be.visible")
            .and('exist');
        sendButton.click();
    })
})