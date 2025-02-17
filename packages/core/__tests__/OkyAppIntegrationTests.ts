import { content } from '../../../../src/modules/translations/content'
import react from react
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('Oky App Integration Test Suite', () => {
  // Sign Up (Online)
  it('Sign Up (Online): User can sign up successfully with valid details', async () => {
    const { getByTestId } = render(<OkyApp />);
    const signUpButton = getByTestId('sign-up-button');
    fireEvent.press(signUpButton);

    const usernameField = getByTestId('username-field');
    const passwordField = getByTestId('password-field');
    const secretQuestionField = getByTestId('secret-question-field');
    const birthMonthField = getByTestId('birth-month-field');
    const birthYearField = getByTestId('birth-year-field');
    const countryField = getByTestId('country-field');
    const provinceField = getByTestId('province-field');
    const okyBuddyField = getByTestId('oky-buddy-field');
    const backgroundPictureField = getByTestId('background-picture-field');
    const firstPeriodField = getByTestId('first-period-field');
    const confirmButton = getByTestId('confirm-button');

    fireEvent.changeText(usernameField, 'testuser');
    fireEvent.changeText(passwordField, 'password123');
    fireEvent.changeText(secretQuestionField, 'What is your pet’s name?');
    fireEvent.changeText(birthMonthField, 'January');
    fireEvent.changeText(birthYearField, '2000');
    fireEvent.changeText(countryField, 'USA');
    fireEvent.changeText(provinceField, 'California');
    fireEvent.press(okyBuddyField);
    fireEvent.press(backgroundPictureField);
    fireEvent.press(firstPeriodField);
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByTestId('profile-confirmation-page')).toBeTruthy());
  });

  it('Sign Up (Online): Error message for username less than 3 characters', async () => {
    const { getByTestId } = render(<OkyApp />);
    const signUpButton = getByTestId('sign-up-button');
    fireEvent.press(signUpButton);

    const usernameField = getByTestId('username-field');
    fireEvent.changeText(usernameField, 'ab');
    const errorMessage = getByTestId('username-error-message');

    await waitFor(() => expect(errorMessage).toHaveTextContent('Username is too short, minimum 3 characters'));
  });

  it('Sign Up (Online): Error message for existing username', async () => {
    const { getByTestId } = render(<OkyApp />);
    const signUpButton = getByTestId('sign-up-button');
    fireEvent.press(signUpButton);

    const usernameField = getByTestId('username-field');
    fireEvent.changeText(usernameField, 'existinguser');
    const errorMessage = getByTestId('username-error-message');

    await waitFor(() => expect(errorMessage).toHaveTextContent('Name already taken'));
  });

  // Login Module (Online)
  it('Login (Online): User can log in with valid credentials', async () => {
    const { getByTestId } = render(<OkyApp />);
    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    const usernameField = getByTestId('username-field');
    const passwordField = getByTestId('password-field');
    const confirmButton = getByTestId('confirm-button');

    fireEvent.changeText(usernameField, 'testuser');
    fireEvent.changeText(passwordField, 'password123');
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByTestId('home-screen')).toBeTruthy());
  });

  it('Login (Online): Error message for incorrect password', async () => {
    const { getByTestId } = render(<OkyApp />);
    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    const usernameField = getByTestId('username-field');
    const passwordField = getByTestId('password-field');
    const confirmButton = getByTestId('confirm-button');

    fireEvent.changeText(usernameField, 'testuser');
    fireEvent.changeText(passwordField, 'wrongpassword');
    fireEvent.press(confirmButton);

    const errorMessage = getByTestId('password-error-message');
    await waitFor(() => expect(errorMessage).toHaveTextContent('Passcode incorrect'));
  });

  // Forgot Password (Online)
  it('Forgot Password (Online): User can reset password with valid details', async () => {
    const { getByTestId } = render(<OkyApp />);
    const forgotPasswordButton = getByTestId('forgot-password-button');
    fireEvent.press(forgotPasswordButton);

    const usernameField = getByTestId('username-field');
    const secretAnswerField = getByTestId('secret-answer-field');
    const newPasswordField = getByTestId('new-password-field');
    const confirmButton = getByTestId('confirm-button');

    fireEvent.changeText(usernameField, 'testuser');
    fireEvent.changeText(secretAnswerField, 'Fluffy');
    fireEvent.changeText(newPasswordField, 'newpassword123');
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByTestId('password-reset-success')).toBeTruthy());
  });

  // Delete Account (Online)
  it('Delete Account (Online): User can delete account successfully', async () => {
    const { getByTestId } = render(<OkyApp />);
    const deleteAccountButton = getByTestId('delete-account-button');
    fireEvent.press(deleteAccountButton);

    const confirmDeleteButton = getByTestId('confirm-delete-button');
    fireEvent.press(confirmDeleteButton);

    await waitFor(() => expect(getByTestId('sign-up-screen')).toBeTruthy());
  });

  // Prediction Engine
  it('Prediction Engine: Future period predictions are displayed correctly', async () => {
    const { getByTestId } = render(<OkyApp />);
    const predictionEngineButton = getByTestId('prediction-engine-button');
    fireEvent.press(predictionEngineButton);

    const futurePrediction = getByTestId('future-prediction');
    await waitFor(() => expect(futurePrediction).toBeTruthy());
  });

  // Calendar (Online)
  it('Calendar (Online): User can mark a day as a period day', async () => {
    const { getByTestId } = render(<OkyApp />);
    const calendarButton = getByTestId('calendar-button');
    fireEvent.press(calendarButton);

    const periodDayButton = getByTestId('period-day-button');
    fireEvent.press(periodDayButton);

    await waitFor(() => expect(getByTestId('period-day-marked')).toBeTruthy());
  });

  // Daily Cards
  it('Daily Cards: User can fill out daily cards', async () => {
    const { getByTestId } = render(<OkyApp />);
    const dailyCardsButton = getByTestId('daily-cards-button');
    fireEvent.press(dailyCardsButton);

    const moodField = getByTestId('mood-field');
    const bodyFeelField = getByTestId('body-feel-field');
    const activityField = getByTestId('activity-field');
    const flowField = getByTestId('flow-field');
    const confirmButton = getByTestId('confirm-button');

    fireEvent.press(moodField);
    fireEvent.press(bodyFeelField);
    fireEvent.press(activityField);
    fireEvent.press(flowField);
    fireEvent.press(confirmButton);

    await waitFor(() => expect(getByTestId('daily-cards-filled')).toBeTruthy());
  });

  // Encyclopedia
  it('Encyclopedia: User can search for valid data', async () => {
    const { getByTestId } = render(<OkyApp />);
    const encyclopediaButton = getByTestId('encyclopedia-button');
    fireEvent.press(encyclopediaButton);

    const searchField = getByTestId('search-field');
    fireEvent.changeText(searchField, 'period');

    await waitFor(() => expect(getByTestId('search-results')).toBeTruthy());
  });

  // Settings
  it('Settings: User can change app language', async () => {
    const { getByTestId } = render(<OkyApp />);
    const settingsButton = getByTestId('settings-button');
    fireEvent.press(settingsButton);

    const languageButton = getByTestId('language-button');
    fireEvent.press(languageButton);

    const russianLanguage = getByTestId('russian-language');
    fireEvent.press(russianLanguage);

    await waitFor(() => expect(getByTestId('language-changed')).toBeTruthy());
  });

  // Logout
  it('Logout: User can log out successfully', async () => {
    const { getByTestId } = render(<OkyApp />);
    const logoutButton = getByTestId('logout-button');
    fireEvent.press(logoutButton);

    await waitFor(() => expect(getByTestId('sign-up-screen')).toBeTruthy());
  });
});