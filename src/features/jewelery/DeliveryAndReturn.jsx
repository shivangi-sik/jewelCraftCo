

const DeliveryAndReturn = () => {
  return (
    <div

                  className="modal fade "
                  id="deliveryModal"
                  tabindex="-1"
                  aria-labelledby="deliveryModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5 text-secondary"
                          id="deliveryModalLabel"
                        >
                          DELIVERY AND RETURN DETAILS
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
                          <strong>
                            How long will it take for my order to be delivered?
                          </strong>
                          <br />
                          From the date of placing the order, It takes 3-7 days
                          for the order to be delivered based upon your
                          location.
                        </p>

                        <p className="text-secondary">
                          <strong>What Payment methods are available?</strong>
                          <br />
                          You can pay via Credit Cards, Debit Cards, Netbanking,
                          Mobile Wallets or Cash on Delivery/Pay on Delivery.
                        </p>

                        <p className="text-secondary">
                          <strong>Can I get my order delivered earlier?</strong>
                          <br />
                          We ship the order within 24-48 hours after you place
                          the order. The rest of the time is taken by the
                          courier companies. Therefore, it's not possible for us
                          to deliver your orders any earlier than that.
                        </p>

                        <p className="text-secondary">
                          <strong>
                            Can I get my orders delivered at a specific time?
                          </strong>
                          <br />
                          Delivering at a specific time may not always be an
                          option from courier services due to their schedules.
                          The delivery person will call you at the time of
                          delivery. You can inform him of your availability and
                          co-ordinate with him. If you are unable to contact
                          him, please drop us an email letting us know of your
                          availability.
                        </p>

                        <p className="text-secondary">
                          <strong>
                            Can I return my order if I don't like it?
                          </strong>
                          <br />
                          Absolutely. We have a no-questions asked exchange
                          policy. All you have to do is inform us within 72
                          hours after receiving the order and make sure the
                          product is unused.
                        </p>

                        <p className="text-secondary">
                          <strong>
                            How do I exchange my product after I have returned
                            it?
                          </strong>
                          <br />
                          Once we receive your product, our team will check that
                          the product has not been used and provide you with
                          store credits. You can use these store credits at any
                          time in the future while placing your new order.
                        </p>

                        <p className="text-secondary">
                          <strong>
                            Can I get a refund instead of store credits?
                          </strong>
                          <br />
                          Refunds are applicable to prepaid orders only. In such
                          a case, we will transfer the amount back to the
                          account where the payment was originally made from.
                          For cash on delivery/pay on delivery orders, we are
                          only able to refund in store credits.
                        </p>
                      </div>
                    </div>
                  </div>

    </div>
  )
}

export default DeliveryAndReturn
