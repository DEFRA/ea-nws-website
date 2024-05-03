export default function SummaryList(rows, onAddClick, onChangeClick) {
  return (
    <>
      <dl class="govuk-summary-list">
        {rows.map((row, index) => (
          <div class="govuk-summary-list__row" key={index}>
            <dt class="govuk-summary-list__key">{row.title}</dt>
            <dd class="govuk-summary-list__value">{row.value}</dd>
            <dd class="govuk-summary-list__actions">
              {row.change ? (
                <dd className="govuk-summary-list__actions">
                  <a
                    className="govuk-link"
                    onClick={() => onChangeClick(index)}
                  >
                    Change
                  </a>
                </dd>
              ) : null}
              {row.add ? (
                <dd className="govuk-summary-list__actions">
                  <a className="govuk-link" onClick={() => onAddClick(index)}>
                    Add
                  </a>
                </dd>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
