export default function TextInput({ name, className, value, onChange = () => {}, id }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <div class="govuk-form-group">
        <label class="govuk-label" for={id}>
          {name}
        </label>
        <input
          className={className}
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
