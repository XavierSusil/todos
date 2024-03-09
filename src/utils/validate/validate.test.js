import validate from "./validate";

describe("Email validation ", () => {
  test("should return true for valid email address", () => {
    expect(validate("email", "test@example.com")).toBe(true);
    expect(validate("email", "user.name@example.com")).toBe(true);
    expect(validate("email", "user123@example.com")).toBe(true);
    expect(validate("email", "user+name@example.com")).toBe(true);
    expect(validate("email", "user_name@example.com")).toBe(true);
    expect(validate("email", "user-name@example.com")).toBe(true);
  });

  test("should return false for invalid email address", () => {
    expect(validate("email", "example.com")).toBe(false); // missing '@' symbol
    expect(validate("email", "user@example")).toBe(false); // missing TLD (Top Level Domain)
    expect(validate("email", "user@example.")).toBe(false); // missing TLD
    expect(validate("email", "user@.com")).toBe(false); // missing domain
    expect(validate("email", "user@-example.com")).toBe(false); // invalid character in domain
    expect(validate("email", "user@_example.com")).toBe(false); // invalid character in domain
  });
});

describe("Username validation", () => {
  test.each([
    ["john-doe", true],
    ["alice", true],
    ["user-name", true],
    ["james", true],
    ["jane", true],
    ["123John", false],
    ["samuel'smith", true],
    ["E@mily", false],
    ["-David", false],
  ])('"%s" should be %s', (firstname, expected) => {
    expect(validate("firstName", firstname)).toBe(expected);
  });
});
