import Signup from "./signup.svelte";
import { render, screen, fireEvent } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Signup Component", () => {
  it("has Signup page header", () => {
    render(Signup);
    const header = screen.getByRole("heading", { name: "Sign Up" });
    expect(header).toBeTruthy();
    console.log(expect.getState().currentTestName);
  });

  it("has Email field", () => {
    render(Signup);
    const emailInput = screen.getByLabelText("Email:*");
    expect(emailInput).toBeTruthy();
  });
  it("has Password Placeholder", () => {
    render(Signup);
    const pwdPlaceHolder = screen.getByPlaceholderText("Enter a password");
    expect(pwdPlaceHolder).toBeTruthy();
  });
  it("has Age Field", () => {
    render(Signup);
    const ageLabel = screen.getByText(/age:/i);
    expect(ageLabel).toBeTruthy();
  });
  it("has Description box", () => {
    render(Signup);
    const aboutPlaceHolder = screen.getByPlaceholderText(
      "Write something about yourself"
    );
    expect(aboutPlaceHolder).toBeTruthy();
  });

  it("password should not have invalid class", async () => {
    render(Signup);
    const pwdField = document.querySelector("#password");
    await userEvent.type(pwdField, "123456789");
    expect(pwdField).not.toHaveClass("is-invalid");
  });

  it("check gender when Gender Field is clicked", () => {
    render(Signup);
    const maleGender = document.querySelector("#r1");
    fireEvent.click(maleGender);
    expect(maleGender).toBeChecked();
  });
  it("Should have Terms Checkbox", async () => {
    render(Signup);
    const termsLabel = screen.getByText(/check me/i);
    const termsField = screen.getByLabelText(/me out/i);
    await userEvent.click(termsLabel);
    expect(termsField).toBeChecked();
  });
  test("Email should be editable", async () => {
    render(Signup);
    const emailInput = document.querySelector("#email");
    await userEvent.type(emailInput, "aa@aa.aa");
    expect(emailInput).toHaveValue("aa@aa.aa");
  });
  test("Given invalid email, highlight field", async () => {
    render(Signup);
    const emailInput = document.querySelector("#email");
    await userEvent.type(emailInput, "aa");
    expect(emailInput).toHaveClass("is-invalid");
  });
  test("Given invalid password, add invalid class", async () => {
    render(Signup);
    const pwdInput = document.querySelector("#password");
    await userEvent.type(pwdInput, "aa");
    expect(pwdInput).toHaveClass("is-invalid");
  });
  test("Given value, should count character", async () => {
    render(Signup);
    const countLabel = screen.getByText(/count:/i);
    const aboutInput = document.querySelector("#textarea");
    await userEvent.type(aboutInput, "I am");

    expect(countLabel).toHaveTextContent("4");
  });
  test("Choosing option, set age", async () => {
    render(Signup);
    const ageSelect = document.querySelector("#selectAge");
    await userEvent.selectOptions(ageSelect, "19yrs to 35yrs");
    expect(
      (
        screen.getByRole("option", {
          name: "19yrs to 35yrs",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(
      (screen.getByRole("option", { name: "Below 18yrs" }) as HTMLOptionElement)
        .selected
    ).toBe(false);
  });
  describe("on Submit", () => {
    test("it exports a method", async () => {
      const { component } = render(Signup);
      expect(component.onSubmit).toBeDefined();
    });
  });
});
