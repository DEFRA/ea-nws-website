import ReactSelect from 'react-select'
import '../../css/select.css'
import { formatSentenceCase } from '../../utils/FormatSentenceCase'

export default function Select({
  id,
  label,
  options,
  name,
  onSelect,
  hint,
  error = '',
  initialSelectOptionText,
  disabledOptions = [],
  value,
  snakeCaseText = false
}) {
  const formattedOptions = options.map((option) => {
    const label = snakeCaseText ? formatSentenceCase(option) : option
    return {
      value: option,
      label,
      isDisabled:
        disabledOptions?.includes(option) || option === initialSelectOptionText
    }
  })

  const selectedOption =
    formattedOptions.find((opt) => opt.value === value) || null

  const handleSelectChange = (selected) => {
    onSelect(selected?.value || '')
  }

  return (
    <div
      className={
        error === ''
          ? 'govuk-form-group'
          : 'govuk-form-group govuk-form-group--error'
      }
    >
      <label className='govuk-label' htmlFor={id || 'id' + name}>
        {label}
      </label>
      {hint && (
        <div id={'id' + hint} className='govuk-hint'>
          {hint}
        </div>
      )}
      {error && (
        <p id='govuk-text-input-error' className='govuk-error-message'>
          <span className='govuk-visually-hidden'>Error:</span> {error}
        </p>
      )}
      <ReactSelect
        id={id || 'id' + name}
        name={name}
        options={formattedOptions}
        value={selectedOption}
        onChange={handleSelectChange}
        isOptionDisabled={(option) => option.isDisabled}
        placeholder={initialSelectOptionText}
        classNamePrefix='select'
        onKeyDown={(e) => {
          if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.stopPropagation()
          }
        }}
      />
    </div>
  )
}
