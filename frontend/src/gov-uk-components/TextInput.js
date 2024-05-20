export default function TextInput({ name, className, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <>
      <div className="govuk-form-group">
        <label className="govuk-label">{name}</label>
        <input
          className={className}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
