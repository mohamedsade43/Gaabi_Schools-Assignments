/* ============================================================
   Week 3 — JavaScript Basics
   ------------------------------------------------------------
   Open the CodePen Console (bottom of the screen) to see output.
   Save the pen to run your code again.
   ============================================================ */


/* ------------------------------------------------------------
   Task 1: Greeting Generator 👋

   Log a friendly greeting using the name.

   Expected output: "Hello, Fatuma! Welcome back."
   ------------------------------------------------------------ */

const name = "Fatuma";

// ✍️ Solve it here ✍️

console.log(`Hello, ${name}! Welcome back.`);


/* ------------------------------------------------------------
   Task 2: Even or Odd ⚖️

   Log "[number] is even." or "[number] is odd."

   Hint: use number % 2 === 0
   ------------------------------------------------------------ */

const number = 7;

// ✍️ Solve it here ✍️

 console.log(`${number} is ${number % 2 === 0 ? 'even' : 'odd'}.`);


/* ------------------------------------------------------------
   Task 3: Movie Rating Classifier 🎬

   Convert the rating into a one-word verdict:
     9-10 → "Amazing"
     7-8  → "Good"
     5-6  → "Okay"
     0-4  → "Skip it"

   Use if / else if / else.
   ------------------------------------------------------------ */

const rating = 6;

// ✍️ Solve it here ✍️

if (rating >= 9 && rating <= 10) {
  console.log("Amazing");
} else if (rating >= 7 && rating <= 8) {
  console.log("Good");
} else if (rating >= 5 && rating <= 6) {
  console.log("Okay");
} else {
  console.log("Skip it");
}

/* ------------------------------------------------------------
   Task 4: Login Validator 🔐

   Both email AND password must match.
   Log "Login successful" or "Wrong email or password".

   Hint: use && to combine the two checks.
   ------------------------------------------------------------ */

const correctEmail = "fatuma@example.com";
const correctPassword = "secret123";

const enteredEmail = "fatuma@example.com";
const enteredPassword = "wrongpass";

// ✍️ Solve it here ✍️


if(enteredEmail === correctEmail && enteredPassword === correctPassword) {
  console.log("Login successful");
} else {
  console.log("Wrong email or password");
}

/* ------------------------------------------------------------
   🚀 STRETCH (optional): Discount Calculator

   Given a price and a discount percent, log the final price.
   Example: price 100, discount 20 → "Final price: $80"
   ------------------------------------------------------------ */

const price = 100;
const discountPercent = 20;

// ✍️ Stretch: solve it here ✍️

console.log(`Final price: $${price - (price * discountPercent / 100)}`);