import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../store/state";
import { Pane, PaneContainer, PaneTitle, UnderTitle } from "../../Panes.style";
import { PayPalFormWrapper, OrangeSubmit } from "./PayPalPane.style";

export const PaypalPane: React.FC = () => {
  const isRecurring = useSelector((state: State) => state.donation.recurring);
  const donationAmount = useSelector((state: State) => state.donation.sum);
  const donationKID = useSelector((state: State) => state.donation.kid);

  const singleForm = (
    <PayPalFormWrapper>
      <UnderTitle>Engangsdonasjon</UnderTitle>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_donations" />
        <input type="hidden" name="charset" value="UTF-8" />
        <input type="hidden" name="currency_code" value="NOK" />
        <input type="hidden" name="amount" value={donationAmount} />
        <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
        <input type="hidden" name="item_name" value="Donasjon" />
        <input
          type="hidden"
          name="notify_url"
          value="https://api.gieffektivt.no/paypal/ipn"
        />
        <input type="hidden" name="custom" value={`${donationKID}`} />
        <input
          type="submit"
          id="single-paypal-submit"
          style={{ display: "none" }}
        />

        <OrangeSubmit
          type="button"
          value="Betal nå"
          onClick={() => {
            document.getElementById("single-paypal-submit")?.click();
          }}
        />
      </form>
    </PayPalFormWrapper>
  );

  const recurringForm = (
    <PayPalFormWrapper>
      <UnderTitle>Månedlig donasjon</UnderTitle>
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
      >
        <input type="hidden" name="cmd" value="_xclick-subscriptions" />
        <input type="hidden" name="charset" value="UTF-8" />
        <input type="hidden" name="currency_code" value="NOK" />
        <input type="hidden" name="business" value="donasjon@gieffektivt.no" />
        <input
          type="hidden"
          name="item_name"
          value="Månedlig donasjon til Stiftelsen Effekt"
        />
        <input
          type="hidden"
          name="notify_url"
          value="https://api.gieffektivt.no/paypal/ipn"
        />
        <input type="hidden" name="custom" value={`${donationKID}`} />
        <input type="hidden" name="a3" value={donationAmount} />
        <input type="hidden" name="p3" value="1" />
        <input type="hidden" name="t3" value="M" />
        <input type="hidden" name="src" value="1" />
        <input type="hidden" name="srt" value="24" />
        <input type="hidden" name="no_note" value="1" />
        <input
          type="submit"
          id="recurring-paypal-submit"
          style={{ display: "none" }}
        />
        <OrangeSubmit
          type="button"
          value="Abonner nå"
          onClick={() => {
            document.getElementById("recurring-paypal-submit")?.click();
          }}
        />
      </form>
    </PayPalFormWrapper>
  );

  return (
    <Pane>
      <PaneContainer>
        <PaneTitle>Gå til PayPal</PaneTitle>
        {!isRecurring && singleForm}
        {isRecurring && recurringForm}
      </PaneContainer>
    </Pane>
  );
};
