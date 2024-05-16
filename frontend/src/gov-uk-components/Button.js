export default function Button ({ text, className, onClick }) {
  return (
    <>
      <button
        type='submit'
        className={className}
        onClick={onClick}
        data-module='govuk-button'
      >
        {text}
      </button>
    </>
  )
}
