

const SizeChart = () => {
  return (
    <div
    className="modal fade "
    id="sizeModal"
    tabindex="-1"
    aria-labelledby="sizeModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
      <div className="modal-content">
        <div className="modal-header">
          <h1
            className="modal-title fs-5 text-secondary"
            id="sizeModalLabel"
          >
            Size Guide
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <p className="text-secondary">
            <strong>Earrings:</strong> All earrings are One Size
            (fits all).
          </p>

          <p className="text-secondary">
            <strong>Rings: </strong>All rings are either
            Adjustable or One Size. For adjustable rings, easily
            fit the size with slight pressure.
          </p>

          <p className="text-secondary">
            <strong>Neckpieces: </strong>All neckpieces have an
            Adjustable chain for suitable fit.
          </p>

          <p className="text-secondary">
            <strong>Bracelets: </strong>All bracelets are Free
            Size and Adjustable.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SizeChart
