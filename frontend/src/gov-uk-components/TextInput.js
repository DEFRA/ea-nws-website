export default function TextInput({ name, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div class="govuk-form-group">
        <h1 class="govuk-label">
          <label class="govuk-label govuk-label" for="event-name">
            {name}
          </label>
        </h1>
        <input
          className="govuk-input--width-20"
          id="event-name"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
