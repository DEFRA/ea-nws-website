import React from "react";
import TextInput from "./Input";
export default function RadioWithInput({inputName, 
    inputClassname, 
    inputValue,
    inputInputType, 
    inputOnChange, 
    inputError,
    id,
    name,
    value,
    label
}) {

    <>
    <div class="govuk-form-group">
    <div class="govuk-radios" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <TextInput name={inputName} className={inputClassname} value={inputValue}
        inputType={inputInputType} onChange={inputOnChange} error={inputError}/>
       
        <input class="govuk-radios__input" 
        id={id} 
        name={name} 
        type="radio" 
        value={value} 
        checked data-aria-controls="conditional-contact"/>

        <label class="govuk-label govuk-radios__label" >
          {label}
        </label>
      </div>
    </div>
</div></>
}