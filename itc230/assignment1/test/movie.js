let expect = require("chai").expect;
let list = require("../list.js");

describe("Movie module", () => {
 it("returns requested movie", function() {
   var result = list.get("Holloween");
   expect(result).to.deep.equal({Title: "Holloween", Genre:"Horror", Price:"$9.99"});
 });
 
 it("fails w/ invalid movie", () => {
   let result = list.get("fake");
   expect(result).to.be.false;
 });
 
 it("true when movie is deleted", () => {
  let result = list.delete("Deadpool");
  expect(result).to.be.true;
 });
 
 it("false when movie is not deleted", () => {
  let result = list.delete("fake");
  expect(result).to.be.false;
 });
 
 
 it("true when movie is added", () => {
  let result = list.add("fake");
  expect(result).to.be.true;
 });
 
 it("false when movie is not added", () => {
  let result = list.add("Holloween");
  expect(result).to.be.false;
 });
});