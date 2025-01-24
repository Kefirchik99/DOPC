import { validateForm } from '../utils/formHelpers';

describe('validateForm', () => {
  it('returns an error if venueSlug is empty', () => {
    const error = validateForm({
      venueSlug: '',
      cartValue: '10',
      latitude: '60.0',
      longitude: '24.0',
    });
    expect(error).toBe('Please enter a valid location!');
  });

  it('returns an error if venueSlug is invalid', () => {
    const error = validateForm({
      venueSlug: 'invalid-venue',
      cartValue: '10',
      latitude: '60.0',
      longitude: '24.0',
    });
    expect(error).toBe(
      'Please use either "home-assignment-venue-helsinki" or "home-assignment-venue-tallinn"'
    );
  });

  it('returns an error if cartValue is 0', () => {
    const error = validateForm({
      venueSlug: 'home-assignment-venue-tallinn',
      cartValue: '0',
      latitude: '60.0',
      longitude: '24.0',
    });
    expect(error).toBe('Cart value must be greater than 0!');
  });

  it('returns null for valid inputs', () => {
    const error = validateForm({
      venueSlug: 'home-assignment-venue-tallinn',
      cartValue: '10',
      latitude: '60.0',
      longitude: '24.0',
    });
    expect(error).toBeNull();
  });
});
