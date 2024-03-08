import validateEmail from "./validateEmail";

describe("validateEmail function test", () => {
  test("should return true for valid email address", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@example.com")).toBe(true);
    expect(validateEmail("user123@example.com")).toBe(true);
    expect(validateEmail("user+name@example.com")).toBe(true);
    expect(validateEmail("user_name@example.com")).toBe(true);
    expect(validateEmail("user-name@example.com")).toBe(true);
  });

  test("should return false for invalid email address", () => {
    expect(validateEmail("example.com")).toBe(false); // missing '@' symbol
    expect(validateEmail("user@example")).toBe(false); // missing TLD (Top Level Domain)
    expect(validateEmail("user@example.")).toBe(false); // missing TLD
    expect(validateEmail("user@.com")).toBe(false); // missing domain
    expect(validateEmail("user@-example.com")).toBe(false); // invalid character in domain
    expect(validateEmail("user@_example.com")).toBe(false); // invalid character in domain
  });
});
