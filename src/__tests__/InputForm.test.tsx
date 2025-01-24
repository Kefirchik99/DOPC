// InputForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputForm from "../components/InputForm";

describe("InputForm", () => {
  it("displays an error modal when invalid inputs are submitted", async () => {
    render(<InputForm />);
    fireEvent.click(screen.getByText("Calculate Delivery Price"));

    // Wait for modal content to appear
    const modalTitle = await screen.findByText("Whoopsie");
    expect(modalTitle).toBeInTheDocument();

    const modalMessage = await screen.findByText("Please enter a valid location!");
    expect(modalMessage).toBeInTheDocument();
  });
});
