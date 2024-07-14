describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    const user2 = {
      name: "Sean Brooksten",
      username: "seansie",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user2);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
  });

  it("Login", function () {
    cy.contains("log in").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.contains("Matti Luukkainen logged-in");
  });

  it("fails with wrong credentials", function () {
    cy.contains("log in").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    cy.contains("Invalid username or password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.createBlog({
        title: "initial blog",
        author: "Sean Brookstein",
        url: "blogging.com",
        likes: 1,
      });
      cy.createBlog({
        title: "another blog",
        author: "Sean Brookstein",
        url: "blogging.com",
        likes: 5,
      });
      cy.createBlog({
        title: "just some more blogs",
        author: "Sean Brookstein",
        url: "blogging.com",
        likes: 2,
      });
    });

    it("a new blog can be created", function () {
      cy.createBlog({
        title: "Blog created by logged in user",
        author: "Sean Brookstein",
        url: "blogging.com",
      });
      cy.contains("Blog created by logged in user");
    });

    it("user can like a blog", function () {
      cy.get("#view-button").click();
      cy.get("#like-button").click();

      cy.contains("Likes 6");
    });

    it("user can delete a blog", function () {
      cy.get("#view-button").click();
      cy.get("#delete-button").click();

      cy.contains("another blog").should("not.exist");
    });

    it("another user cannot delete blog", function () {
      cy.get("#logout-button").click();
      cy.login({ username: "seansie", password: "password" });
      cy.get("#view-button").click();
      cy.get("#delete-button").should("not.exist");
    });

    it.only("blogs are organised in decending order", function () {
      cy.get(".blog").eq(0).should("contain", "another blog");
      cy.get(".blog").eq(1).should("contain", "just some more blogs");
      cy.get(".blog").eq(2).should("contain", "initial blog");
    });
  });
});
