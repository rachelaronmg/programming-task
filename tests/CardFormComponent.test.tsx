import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardFormComponent from "../components/CardFormComponent";
import React from "react";

const mockUser = { userName: "JohnDoe", date_of_birth: "01/01/1990" };

describe("CardFormComponent", () => {
  test("renders form fields and buttons", () => {
    render(<CardFormComponent user={mockUser} />);

    expect(screen.getByLabelText(/New PIN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm PIN/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("displays error when PIN is not 4 digits", () => {
    render(<CardFormComponent user={mockUser} />);

    const pinInput = screen.getByLabelText(/New PIN/i);
    fireEvent.change(pinInput, { target: { value: "123" } });

    expect(screen.getByText("PIN must be 4 digits")).toBeInTheDocument();
  });

  test("displays error when PINs do not match", () => {
    render(<CardFormComponent user={mockUser} />);

    const pinInput = screen.getByLabelText(/New PIN/i);
    const confirmPinInput = screen.getByLabelText(/Confirm PIN/i);

    fireEvent.change(pinInput, { target: { value: "1234" } });
    fireEvent.change(confirmPinInput, { target: { value: "5678" } });

    expect(
      screen.getByText("PIN and Confirm PIN must match")
    ).toBeInTheDocument();
  });

  test("allows form submission when PINs match and are valid", () => {
    render(<CardFormComponent user={mockUser} />);

    const pinInput = screen.getByLabelText(/New PIN/i);
    const confirmPinInput = screen.getByLabelText(/Confirm PIN/i);
    const updateButton = screen.getByRole("button", { name: /Update/i });

    fireEvent.change(pinInput, { target: { value: "1234" } });
    fireEvent.change(confirmPinInput, { target: { value: "1234" } });
    fireEvent.click(updateButton);
  });
});
