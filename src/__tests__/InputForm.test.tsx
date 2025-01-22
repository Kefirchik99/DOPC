import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputForm from '../components/InputForm';

describe('InputForm', () => {
    it('renders the form with all fields and buttons', () => {
        render(<InputForm />);

        expect(screen.getByText('Delivery Order Price Calculator')).toBeInTheDocument();
        expect(screen.getByLabelText('Venue Slug')).toBeInTheDocument();
        expect(screen.getByLabelText('Cart Value (EUR)')).toBeInTheDocument();
        expect(screen.getByLabelText('User Latitude')).toBeInTheDocument();
        expect(screen.getByLabelText('User Longitude')).toBeInTheDocument();
    });

    it('displays an error when invalid inputs are submitted', () => {
        render(<InputForm />);
        fireEvent.click(screen.getByText('Calculate Delivery Price'));
        expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid location!');
    });
});
