import { calculateMortgage } from "./calc.js";

/* Form and UI related code */
const resetButton = document.querySelector(".calc__clear");
const result = document.querySelector(".calc__results-result");
const empty = document.querySelector(".calc__results-empty");
const form = document.querySelector(".calc__form");
const mortgageAmount = parseFloat(
  document.getElementById("mortgage-amount").value.replace(/,/g, "")
);

export function initializeValidator() {
  const validator = new JustValidate(".calc__form", {
    errorFieldCssClass: "error",
  });

  validator
    .addField("#mortgage-amount", [
      {
        rule: "required",
        errorMessage: "This field is required",
      },
      {
        rule: "number",
        errorMessage: "Please enter a valid number",
      },
      {
        rule: "minNumber",
        value: 5000,
        errorMessage: "The minimum value is £5,000",
      },
      {
        rule: "maxNumber",
        value: 1000000,
        errorMessage: "The maximum value is £1,000,000",
      },
    ])
    .addField("#mortgage-term", [
      {
        rule: "required",
        errorMessage: "This field is required",
      },
      {
        rule: "integer",
        errorMessage: "Please enter a valid number",
      },
      {
        rule: "minNumber",
        value: 5,
        errorMessage: "The minimum value is 5 years",
      },
      {
        rule: "maxNumber",
        value: 40,
        errorMessage: "The maximum number is 40 years",
      },
    ])
    .addField("#interest-rate", [
      {
        rule: "required",
        errorMessage: "This field is required",
      },
      {
        rule: "number",
        errorMessage: "Please enter a valid number",
      },
      {
        rule: "minNumber",
        value: 1,
        errorMessage: "The minimum value is 1%",
      },
      {
        rule: "maxNumber",
        value: 10,
        errorMessage: "The maximum number is 10%",
      },
    ])
    .addRequiredGroup(".radio-group", "This field is required")

    .onSuccess((event) => {
      event.preventDefault();

      result.classList.remove("hidden");
      empty.classList.add("hidden");
      calculateMortgage();
    });

  resetButton.addEventListener("click", () => {
    result.classList.add("hidden");
    empty.classList.remove("hidden");
    form.reset();
  });
}
