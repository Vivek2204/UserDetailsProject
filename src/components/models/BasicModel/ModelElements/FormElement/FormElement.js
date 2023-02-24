import React from "react";
import "./FormElement.css";

export default function FormElement({
  labelText,
  type,
  value,
  placeHolder,
  handleChange,
}) {
  return (
    <div className="mb-2">
      <label className="formelement-required w-25 d-inline-flex justify-content-end">
        {labelText}:
      </label>
      <input
        className="d-inline w-75"
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
