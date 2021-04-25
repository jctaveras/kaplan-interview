[![Test](https://github.com/jctaveras/kaplan-interview/actions/workflows/tests.yml/badge.svg)](https://github.com/jctaveras/kaplan-interview/actions/workflows/tests.yml)
# Kaplan React Interview

Your goal is to implement a React application with a login screen, welcome page, and account settings. You may use any additional packages in the project you would like. If you are not familiar with TypeScript, you may use JavaScript instead. After completing your work, please send the CodeSandbox URL to your Kaplan contact via email.

## Login Page

The login page should accept username/email and password credentials for authentication. Please see the file `Mockup 1.png` in the project as examples of the various states of the login page and the default UI requirements, along with the following details:

1. The login page should have a field for Username / Email Address, Password, and a Login button.
2. The login button should be disabled until the user has entered both an email address and a password.
3. The login button should be disabled after being clicked and display a "Loading..." message.
4. Clicking the login button should call the fake API login.ts function. Half the time the function will fail and half the time it will succeed.
5. If the function fails the login screen should display the error messages returned, and re-enable the Login button.
6. If the function succeeds the user should be taken to the Welcome page.

**Bonus**
Customers often want a friendly, customized experience that is familiar to them. We would like the ability to change the styles (e.g. colors) of the components, such as the Login button. It is ok to have these styles in code files and apply them with query string or url params. Please see the file `Mockup 2.png` as an example of a 2nd login style.

## Welcome Page

After logging in the user should be displayed a welcome page showing their Username / Email address. The user should be able to navigate to the Account page where they can update their Username / Email address. The page should also have a way of logging out of the application and returning to the login screen.

## Account Page

The account page should have an input field for the user to change their current Username / Email address and a Save button to apply the changes. After clicking "Save" the user should be taken back to the Welcome page where their updated Username / Email address displays.
