const apiURL = "http://localhost:3000/posts/";
const login = () => {
  cy.visit("http://localhost:8080/");
  cy.get("button[data-test=loginbtn]").click();
  cy.url().should("include", '/login');
  cy.get("input[data-test=username]").type('GYF');
  cy.get("input[data-test=password]").type('123');
  cy.get("button[type=submit]").click();
  cy.url().should("include", "/");
  cy.get(".vue-title").should("contain", "Welcome GYF");
};

const checkDetailView = () => {
  login();
  cy.get(".navbar-nav")
    .eq(0)
    .find(".nav-item")
    .eq(1)
    .click();
  cy.url().should("include", "/posts");
  cy.get("tbody")
    .find("tr")
    .should("have.length", 2)
    .eq(0)
    .find("td")
    .eq(5)
    .find("a")
    .click();
  cy.url().should("include", "/detailview");
};

describe('Post list', () => {
  beforeEach(() => {
    //User Initialization
    cy.request("http://localhost:3000/users/")
      .its("body")
      .then(users => {
        users.forEach(element => {
          cy.request("DELETE", `http://localhost:3000/deleteUser/${element._id}`);
        });
      });
    const user = {
      username: "GYF",
      password: "123",
      email: "994593696@qq.com"
    };
    cy.request("POST", `http://localhost:3000/reg`, user);

    //Post Initialization
    cy.request("http://localhost:3000/posts/")
      .its("body")
      .then(posts => {
        posts.forEach(element => {
          cy.request("DELETE", `http://localhost:3000/deletePost/${element._id}`);
        });
      });

    const post1 = {
      title: "PostTest",
      author: "GYF",
      content: "This is a test of posting"
    };
    const post2 = {
      title: "PostTest2",
      author: "GYF",
      content: "This is a test of posting"
    };
    cy.request("POST", `http://localhost:3000/writeposts`, post1);
    cy.request("POST", `http://localhost:3000/writeposts`, post2);

  });

  it('gets post list page', () => {
    login();
    cy.get(".navbar-nav")
      .eq(0)
      .find(".nav-item")
      .eq(1)
      .click();
    cy.url().should("include", "/posts");
    cy.get("tbody")
      .find("tr")
      .should("have.length", 2)
  });

  describe('Detail view page', () => {
    describe('Check detail view page', () => {
      it("gets detail view page", () => {
        checkDetailView();
        cy.get(".vue-title").should("contain", "PostTest");
      });
    });

    describe('For a confirmed delete operation', () => {
      it('deletes the post', () => {
        checkDetailView();
        cy.get(".vue-title").should("contain", "PostTest");
        cy.get('[data-test=deletebtn]').click();
        cy.get("button")
          .contains("Delete")
          .click();
        cy.get("button")
          .contains("OK")
          .click();
        cy.url().should("include", "/posts");
        cy.get("tbody")
          .find("tr")
          .should("have.length", 1);
      });
    });

    describe('For a cancelled delete operation', () => {
      it('leaves the list unchanged', () => {
        checkDetailView();
        cy.get(".vue-title").should("contain", "PostTest");
        cy.get('[data-test=deletebtn]').click();
        cy.get("button")
          .contains("Cancel")
          .click();
        cy.get(".navbar-nav")
          .eq(0)
          .find(".nav-item")
          .eq(1)
          .click();
        cy.url().should("include", "/posts");
        cy.get("tbody")
          .find("tr")
          .should("have.length", 2);
      });
    });
  });

  describe('Add like for one post', () => {
    it("adds 1 like", () => {
      login();
      cy.get(".navbar-nav")
        .eq(0)
        .find(".nav-item")
        .eq(1)
        .click();
      cy.url().should("include", "/posts");
      cy.get("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .eq(4)
        .find("a")
        .click();
      cy.get(':nth-child(2)').contains('1')
    });
  });
});
