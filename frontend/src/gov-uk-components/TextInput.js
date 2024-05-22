export default function TextInput({
  name,
  className,
  value,
  onChange = () => {},
  error = ''
}) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div
        class={
          error === ''
            ? 'govuk-form-group'
            : 'govuk-form-group govuk-form-group--error'
        }
      >
        <label class="govuk-label" for="event-name">
          {name}
        </label>
        {error !== '' && (
          <p id="{id}-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </p>
        )}
        <input
          className={error === '' ? className : 'govuk-input--error'}
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
