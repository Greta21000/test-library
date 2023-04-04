import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

beforeAll(() => {});
afterEach(() => {});
afterAll(() => {});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const pwdInputElement = screen.getByLabelText("Password");
  const confirmPwdInputElement = screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(pwdInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPwdInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    pwdInputElement,
    confirmPwdInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /valider/i,
  });
  userEvent.click(submitBtnElement);
};

test("Test champs vides à l'initialisation", () => {
  expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
  expect(screen.getByLabelText("Password").value).toBe("");
  expect(screen.getByLabelText(/confirm password/i).value).toBe("");
});

test("Email est-il valide", () => {
  const { emailInputElement } = typeIntoForm({ email: "test@gmail.com" });
  expect(emailInputElement.value).toBe("test@gmail.com");
});

test("Saisie du mdp fonctionne correctement", () => {
  const { pwdInputElement } = typeIntoForm({ password: "test1234" });
  expect(pwdInputElement.value).toBe("test1234");
});

test("Saisie du confirm mdp fonctionne correctement", () => {
  const { confirmPwdInputElement } = typeIntoForm({
    confirmPassword: "test1234",
  });
  expect(confirmPwdInputElement.value).toBe("test1234");
});

test("La saisie du mail est-elle valide", async () => {
  expect(screen.queryByText(/email invalid/i)).not.toBeInTheDocument();

  typeIntoForm({ email: "test.gmail.com" });
  typeIntoForm({ confirmPassword: "test1234" });

  clickOnSubmitButton();

  expect(await screen.findByText(/email invalid/i)).toBeInTheDocument();
});

test("La mdp fait il plus de 5 caractères", async () => {
    expect(screen.queryByText(/le mot de passe doit contenir au moins 5 caractères/i)).not.toBeInTheDocument();
    typeIntoForm({ email: "test@gmail.com" });
    typeIntoForm({ confirmPassword: "test" });
    clickOnSubmitButton();

    expect(await screen.findByText(/le mot de passe doit contenir au moins 5 caractères/i)).toBeInTheDocument();
  });