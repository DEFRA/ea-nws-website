export default function TextInput ({ name, className, value, onChange = () => {}, id, errorList = [] }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div class={errorList.length === 0 ? 'govuk-form-group' : 'govuk-form-group govuk-form-group--error'}>
        <label class='govuk-label' for={id}>
          {name}
        </label>
        {errorList.length > 0 && (
          <p id='{id}-error' className='govuk-error-message'>
            <span className='govuk-visually-hidden'>Error:</span> {errorList}
          </p>
        )}
        <input
          className={errorList.length === 0 ? className : 'govuk-input govuk-input--error'}
          id={id}
          type='text'
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
