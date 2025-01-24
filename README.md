# Delivery Order Price Calculator (DOPC)

## 1. Project Overview

Delivery Order Price Calculator (DOPC) is a simple web application designed to calculate delivery order costs. It connects to the Wolt API to fetch venue-related data and provides a detailed breakdown of delivery fees, surcharges, and the total price. With an intuitive interface and accessibility features, it ensures users can quickly get the information they need.

---

## 2. Technologies Used

- **React**: For building the user interface.
- **TypeScript**: Ensuring type safety and robustness.
- **React-Bootstrap**: For pre-styled, accessible UI components.
- **Axios**: For API requests.
- **Vite**: For fast builds and development server.
- **Jest**: For unit testing.
- **Testing Library**: For testing React components.
- **ESLint**: For code linting and maintaining style consistency.
- **SCSS**: For modular and scalable styling.

---

## 3. Installation Steps

1. Unzip the downloaded archive.
2. Navigate to the project folder:
   ```bash
   cd <project-folder>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 4. How to Use the Application

1. **Input Details**:
   - Enter the following in the input fields:
     - Venue Slug (e.g., `home-assignment-venue-tallinn`).
     - Cart Value in EUR (e.g., `10.55`).
     - Latitude (e.g., `59.4385937`).
     - Longitude (e.g., `24.7513679`).
   - Alternatively, click the "Get Location" button to auto-fill latitude and longitude using your browser’s geolocation.
2. **Calculate Delivery Price**:
   - Click the "Calculate Delivery Price" button to see a detailed breakdown of fees.

---

## 5. Outputs

The results are displayed as:

- **Cart Value**: The value in EUR.
- **Small Order Surcharge**: Additional charge for small orders (if applicable).
- **Delivery Fee**: Calculated based on distance.
- **Delivery Distance**: Straight-line distance to the venue in meters.
- **Total Price**: Sum of all charges in EUR.

_Note: If the distance is too far for delivery, the app will notify you with an appropriate error message._

---

## 6. API Integration

### Endpoints Used:

- **Static Data**:
  ```bash
  https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/<VENUE_SLUG>/static
  ```
- **Dynamic Data**:
  ```bash
  https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/<VENUE_SLUG>/dynamic
  ```

Both endpoints return relevant data for pricing and validation. The app uses Axios for fetching data and handling errors.

---

## 7. How to Run Tests

To run tests:

```bash
npm test
```

The testing setup uses Jest and React Testing Library. Tests cover:

- Input validation.
- Pricing calculations.
- API integration.
- Component rendering and interactivity.

---

## 8. Accessibility Features

- **ARIA Attributes**: Inputs have labels, placeholders, and ARIA attributes for screen readers.
- **Keyboard Navigation**: All inputs and buttons are accessible using keyboard navigation.
- **Error Handling**: Clear feedback for validation errors ensures usability for all users.

---

### Notes

- If your location is too far, you can use the example coordinates provided under the input fields.
