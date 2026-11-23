const { parseCookie, formatColorList } = require("../../public/js/code.js");

describe("parseCookie", () => {
  test("reads firstName, lastName, and userId from the cookie string", () => {
    const result = parseCookie("firstName=Rick,lastName=Leinecker,userId=1");
    expect(result).toEqual({ firstName: "Rick", lastName: "Leinecker", userId: 1 });
  });

  test("returns userId -1 when there is no cookie (forces redirect to login)", () => {
    expect(parseCookie("").userId).toBe(-1);
  });
});

describe("formatColorList", () => {
  test("joins multiple colors with line breaks", () => {
    expect(formatColorList(["Red", "Blue"])).toBe("Red<br />\r\nBlue");
  });

  test("returns a single color with no line break", () => {
    expect(formatColorList(["Green"])).toBe("Green");
  });

  test("returns an empty string when the API sends no results", () => {
    expect(formatColorList(undefined)).toBe("");
  });
});
