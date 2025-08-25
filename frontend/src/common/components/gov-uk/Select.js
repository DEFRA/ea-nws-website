import { useEffect, useState } from 'react'
import ReactSelect, { components } from 'react-select'
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
  const [lastInput, setLastInput] = useState('mouse')

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
        setLastInput('keyboard')
      }
    }
    const handleMouse = () => setLastInput('mouse')

    window.addEventListener('keydown', handleKey)
    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

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
        components={{ Menu: components.Menu }}
        classNames={{
          option: (state) =>
            state.isFocused &&
            !state.isSelected &&
            !state.isDisabled &&
            lastInput === 'keyboard'
              ? 'keyboard-focused'
              : ''
        }}
        onKeyDown={(e) => {
          if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            setLastInput('keyboard')
            e.stopPropagation()
          }
        }}
      />
    </div>
  )
}
