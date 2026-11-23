const BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8000";

async function post(endpoint, body) {
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Login.php", () => {
  test("returns the user's info for valid credentials", async () => {
    const res = await post("Login.php", { login: "testuser", password: "testpass" });

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ id: 1, firstName: "Test", lastName: "User", error: "" });
  });

  test("rejects invalid credentials with the expected JSON structure", async () => {
    const res = await post("Login.php", { login: "testuser", password: "wrong" });

    expect(await res.json()).toEqual({ id: 0, firstName: "", lastName: "", error: "No Records Found" });
  });
});

describe("SearchColors.php", () => {
  test("returns only the user's colors that match the search", async () => {
    const res = await post("SearchColors.php", { search: "Blue", userId: 1 });
    const json = await res.json();

    expect(json.error).toBe("");
    expect(json.results).toEqual(expect.arrayContaining(["Blue", "Light Blue"]));
    expect(json.results).toHaveLength(2);
  });

  test("returns an error for a user with no colors", async () => {
    const res = await post("SearchColors.php", { search: "", userId: 999 });

    expect((await res.json()).error).toBe("No Records Found");
  });
});

describe("AddColor.php", () => {
  test("adds a color that a later search can find", async () => {
    const add = await post("AddColor.php", { color: "Teal", userId: 1 });
    expect((await add.json()).error).toBe("");

    const search = await post("SearchColors.php", { search: "Teal", userId: 1 });
    expect((await search.json()).results).toContain("Teal");
  });
});
