import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Test champs vides à l'initialisation", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("Email est-il valide", () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText(/email/i);
  userEvent.type(emailInputElement, "test@gmail.com");
  expect(emailInputElement.value).toBe("test@gmail.com");
});

test("Saisie du mdp fonctionne correctement", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "test1234");
  expect(passwordInputElement.value).toBe("test1234");
});

test("Saisie du confirm mdp fonctionne correctement", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "test1234");
  expect(confirmPasswordInputElement.value).toBe("test1234");
});

test("La saisie du mail est-elle valide", async () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(/email invalid/i);
  const emailInputElement = screen.getByLabelText(/email/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /valider/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "test.gmail.com");
  userEvent.click(submitBtnElement);

  const emailErrorElement2 = await screen.findByText(/email invalid/i);
  expect(emailErrorElement2).toBeInTheDocument();
});

test("La mdp fait il plus de 5 caractères", async () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordErrorElement = screen.queryByText(/le mot de passe doit contenir au moins 5 caractères/i);
  const passwordInputElement = screen.getByLabelText("Password");
  
  const submitBtnElement = screen.getByRole("button", {
    name: /valider/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "test");
  userEvent.click(submitBtnElement);

  const passwordErrorElement2 = await screen.findByText(/le mot de passe doit contenir au moins 5 caractères/i);
  expect(passwordErrorElement2).toBeInTheDocument();
});

test("Le mdp et sa confirmation ne sont pas identiques", async () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordErrorElement = screen.queryByText(/le mot de passe et sa confirmation ne sont pas identiques/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
  screen.getByLabelText(/confirm password/i);
  
  const submitBtnElement = screen.getByRole("button", {
    name: /valider/i,
  });

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12346");
  userEvent.click(submitBtnElement);

  const passwordErrorElement2 = await screen.findByText(/le mot de passe et sa confirmation ne sont pas identiques/i);
  expect(passwordErrorElement2).toBeInTheDocument();
});

test("Pas de msg d'erreur si tous les champs sont correctement renseignés", () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
  screen.getByLabelText(/confirm password/i);
  
  const submitBtnElement = screen.getByRole("button", {
    name: /valider/i,
  });

  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");
  userEvent.click(submitBtnElement);

  const emailErrorElement = screen.queryByText(/email invalid/i);
  const passwordErrorElement = screen.queryByText(/le mot de passe doit contenir au moins 5 caractères/i);
  const confirmPasswordErrorElement = screen.queryByText(/le mot de passe et sa confirmation ne sont pas identiques/i);
  
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});