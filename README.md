# Programming Task

This project is a React-based web application, using Next.js framework, focusing on PIN setting functionality.

## Project Structure

The project contains the following key files:

- `components/CardFormComponent.tsx`: A form component for setting a PIN.
- `components/SuccessComponent.tsx`: A success page displayed after successful PIN setting.

## Components

### Card Form Component (`CardFormComponent.tsx`)

This component includes:

- Input fields for PIN and PIN confirmation
- Error handling for input validation
- Submit and Cancel button functionality
- Validation rules for PIN (4 digits, not year of birth, not date of birth, not easy to guess)

### Success Component (`SuccessComponent.tsx`)

A simple component that displays a success message after PIN has been set successfully.

## Styling

The project uses Tailwind CSS for styling, as evident from the class names used in the components.

## Testing

The project includes unit tests for the CardFormComponent:

- `tests/CardFormComponent.test.tsx`: Contains tests for rendering, input validation, and error handling.

## Getting Started

To run this project:

1. Clone the repository
2. Install dependencies (using `npm install` or `yarn`)
3. Run the development server (using `npm run dev` or `yarn dev`)

## TypeScript

All components are strongly typed using TypeScript, ensuring type safety throughout the application.
