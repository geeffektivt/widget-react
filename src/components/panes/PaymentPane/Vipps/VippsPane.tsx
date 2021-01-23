import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaneNumber } from "../../../../store/layout/actions";
import { PaneNumber, State } from "../../../../store/state";
import { Pane, PaneContainer } from "../../Panes.style";
import { VippsButton } from "./VippsPane.style";

export const VippsPane: React.FC = () => {
  const vippsPaymentURL = useSelector(
    (state: State) => state.donation.paymentProviderURL
  );
  const dispatch = useDispatch();

  function openVipps() {
    window.open(vippsPaymentURL);
    dispatch(setPaneNumber(PaneNumber.ResultPane));
  }

  return (
    <Pane>
      <PaneContainer>
        <VippsButton onClick={openVipps} />
      </PaneContainer>
    </Pane>
  );
};
