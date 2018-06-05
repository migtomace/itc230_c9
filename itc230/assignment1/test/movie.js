let expect = require("chai").expect;
let list = require("../list.js");

describe("Movie module", () => {
 it("returns requested movie", function() {
   var result = list.get("Holloween");
   expect(result).to.deep.equal({Title: "Holloween", Genre:"Horror", Price:"$9.99"});
 });
 
 it("fails w/ invalid movie", () => {
   let result = list.get("fake");
   let un = "Movie not found";
   expect(result).to.have.string(un);
 });
});