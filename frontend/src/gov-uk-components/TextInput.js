export default function TextInput({
  name,
  className,
  value,
  onChange = () => {},
  errorList = []
}) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div
        class={
          errorList.length === 0
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label class="govuk-label" for="event-name">
          {name}
        </label>
        {errorList.length > 0 && (
          <p id="{id}-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errorList}
          </p>
        )}
        <input
          className={
            errorList.length === 0
              ? className
              : 'govuk-input govuk-input--error'
          }
          name={name}
          id="event-name"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
