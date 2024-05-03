export default function TextInput({ name, className, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div class="govuk-form-group">
        <label class="govuk-label" for="event-name">
          {name}
        </label>
        <input
          className={className}
          id="event-name"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
