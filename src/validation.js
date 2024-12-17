import { calculateMortgage } from "./calc.js";

/* Form and UI related code */
const resetButton = document.querySelector(".calc__clear");
const result = document.querySelector(".calc__results-result");
const empty = document.querySelector(".calc__results-empty");
const form = document.querySelector(".calc__form");

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
    ])
    .addField("#mortgage-term", [
      {
        rule: "required",
        errorMessage: "This field is required",
      },
    ])
    .addField("#interest-rate", [
      {
        rule: "required",
        errorMessage: "This field is required",
      },
    ])
    .addRequiredGroup(".radio-group", "This field is required")

    .onSuccess((event) => {
      event.preventDefault();

      calculateMortgage();

      result.classList.remove("hidden");
      empty.classList.add("hidden");
    });

  resetButton.addEventListener("click", () => {
    result.classList.add("hidden");
    empty.classList.remove("hidden");
    form.reset();
  });

  return validator;
}
