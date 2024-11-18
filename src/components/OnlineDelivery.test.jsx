import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import OnlineDelivery from './OnlineDelivery';

describe('OnlineDelivery Component with Real API', () => {
  it('fetches and displays food items from the real API', async () => {
    render(<OnlineDelivery />);

    // Wait for an expected Area from the API
    const foodItem = await screen.findByText('Indian'); // Replace with a known item
    expect(foodItem).toBeInTheDocument();

    // Check for another Area food item
    const anotherFoodItem = await screen.findByText('Spanish'); // Replace with another known item
    expect(anotherFoodItem).toBeInTheDocument();
  });
});
