# Password Validation Test Cases

## Form Behavior

- **Validation Rule**: Password must be at least 8 characters
- **Error Message**: "Password must be at least 8 characters."
- **Expected Behavior**: Form submission is prevented if validation fails

---

## Test Cases

### 1. VALID INPUTS (Should Allow Submission)

| Test ID | Description             | Input                                                       | Expected Result           |
| ------- | ----------------------- | ----------------------------------------------------------- | ------------------------- |
| V1      | Exactly 8 characters    | `password`                                                  | ✅ Form submits, no error |
| V2      | More than 8 characters  | `mypassword123`                                             | ✅ Form submits, no error |
| V3      | Long password           | `SuperSecurePassword@2024`                                  | ✅ Form submits, no error |
| V4      | With numbers            | `12345678`                                                  | ✅ Form submits, no error |
| V5      | With special characters | `Pass@123!`                                                 | ✅ Form submits, no error |
| V6      | Mixed case with symbols | `MyP@ssw0rd`                                                | ✅ Form submits, no error |
| V7      | Spaces (trimmed to 8+)  | `password ` (with trailing space)                           | ✅ Form submits, no error |
| V8      | Very long password      | `ThisIsAVeryLongAndComplexPasswordWithManyCharacters123!@#` | ✅ Form submits, no error |

---

### 2. INVALID INPUTS (Should Show Error & Prevent Submission)

| Test ID | Description      | Input              | Expected Result                                           |
| ------- | ---------------- | ------------------ | --------------------------------------------------------- |
| I1      | Empty field      | `` (empty)         | ❌ Error shown: "Password must be at least 8 characters." |
| I2      | Single character | `a`                | ❌ Error shown                                            |
| I3      | 4 characters     | `pass`             | ❌ Error shown                                            |
| I4      | 7 characters     | `1234567`          | ❌ Error shown                                            |
| I5      | Space only       | ` ` (single space) | ❌ Error shown                                            |
| I6      | Multiple spaces  | `     ` (5 spaces) | ❌ Error shown                                            |

---

### 3. EDGE CASES

| Test ID | Description                     | Input                       | Expected Result                     |
| ------- | ------------------------------- | --------------------------- | ----------------------------------- |
| E1      | Exactly 7 characters (boundary) | `1234567`                   | ❌ Error shown (just under minimum) |
| E2      | Exactly 8 characters (boundary) | `12345678`                  | ✅ Form submits (at minimum)        |
| E3      | Exactly 9 characters (boundary) | `123456789`                 | ✅ Form submits (just over minimum) |
| E4      | Leading spaces trimmed          | `  password`                | ✅ Form submits (after trim = 8)    |
| E5      | Trailing spaces trimmed         | `password  `                | ✅ Form submits (after trim = 8)    |
| E6      | Only special characters         | `!@#$%^&*`                  | ✅ Form submits (8 characters)      |
| E7      | Only numbers                    | `00000000`                  | ✅ Form submits (considered valid)  |
| E8      | Unicode characters              | `パスワード1234` (Japanese) | ✅ Form submits (if 8+ chars)       |
| E9      | Spaces in middle preserved      | `pass word` (9 chars)       | ✅ Form submits                     |

---

### 4. USER EXPERIENCE TEST CASES

| Test ID | Description               | Scenario                          | Expected Result                           |
| ------- | ------------------------- | --------------------------------- | ----------------------------------------- |
| UX1     | Error message visibility  | Enter invalid password, see error | Error appears below password field in red |
| UX2     | Error message clears      | Fix password to 8+ chars          | Error message disappears                  |
| UX3     | Error message persistence | Submit with invalid, error shows  | Error remains on screen until fixed       |
| UX4     | Form clears on success    | Submit valid form                 | All fields reset, success message shown   |
| UX5     | Tab behavior              | Tab through form fields           | Password field receives focus normally    |
| UX6     | Masked input              | Type in password field            | Characters appear as dots/asterisks (•••) |

---

### 5. INTEGRATION TEST CASES

| Test ID | Description                    | Scenario                                              | Expected Result                                                |
| ------- | ------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------- |
| INT1    | All fields empty               | Submit blank form                                     | Email and Message show "required", password shows 8-char error |
| INT2    | Password invalid, others valid | Name, Email, Subject, Message valid, Password invalid | Form doesn't submit, only password error shown                 |
| INT3    | Password valid, others invalid | Password is 8+, but Email is invalid                  | Form doesn't submit due to email validation                    |
| INT4    | All fields valid               | Complete all fields correctly                         | Form submits, success alert appears                            |
| INT5    | Re-submit after fix            | First invalid, then fix and resubmit                  | Second submission succeeds                                     |

---

## Automation Testing Example (JavaScript/Jest)

```javascript
describe("Password Validation", () => {
  let passwordInput, passwordError, form;

  beforeEach(() => {
    passwordInput = document.getElementById("password");
    passwordError = document.getElementById("passwordError");
    form = document.querySelector(".contact-form");
    passwordError.textContent = "";
  });

  // Valid cases
  test("Should accept exactly 8 characters", () => {
    passwordInput.value = "12345678";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe("");
  });

  test("Should accept more than 8 characters", () => {
    passwordInput.value = "password123";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe("");
  });

  // Invalid cases
  test("Should reject empty password", () => {
    passwordInput.value = "";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe(
      "Password must be at least 8 characters.",
    );
  });

  test("Should reject 7 characters", () => {
    passwordInput.value = "1234567";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe(
      "Password must be at least 8 characters.",
    );
  });

  // Edge cases
  test("Should trim whitespace before validation", () => {
    passwordInput.value = "  password  ";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe("");
  });

  test("Should reject spaces only", () => {
    passwordInput.value = "        ";
    document.querySelector('button[type="submit"]').click();
    expect(passwordError.textContent).toBe(
      "Password must be at least 8 characters.",
    );
  });
});
```

---

## Manual Testing Checklist

- [ ] Test V1: Enter exactly 8 characters and submit
- [ ] Test I1: Leave password empty and click submit
- [ ] Test I4: Enter 7 characters and verify error message appears
- [ ] Test E2: Verify 8 characters passes but 7 fails
- [ ] Test UX2: Enter invalid, fix it, verify error clears
- [ ] Test UX6: Verify password field masks input with dots
- [ ] Test INT4: Fill entire form correctly and submit
- [ ] Test INT2: Fill all fields except password with valid data, leave password at 6 chars
