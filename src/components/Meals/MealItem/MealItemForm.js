import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import React, { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amoutIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();
    const enteredAmount = parseInt(amountInputRef.current.value);

    if (enteredAmount.length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add </button>
      {!amoutIsValid && <p>Please enter an amount between 1 and 5.</p>}
    </form>
  );
};

export default MealItemForm;
