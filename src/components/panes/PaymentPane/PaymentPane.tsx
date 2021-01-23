import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../store/state";
import { PaymentMethod } from "../../../types/Enums";
import { ResultPane } from "./Bank/ResultPane";
import { PaypalPane } from "./Paypal/PayPalPane";
import { VippsPane } from "./Vipps/VippsPane";

export const PaymentPane: React.FC = () => {
  const method = useSelector((state: State) => state.donation.method);

  switch (method) {
    case PaymentMethod.BANK:
      return <ResultPane />;
    case PaymentMethod.PAYPAL:
      return <PaypalPane />;
    case PaymentMethod.VIPPS:
      return <VippsPane />;
    default:
      return <div>Invalid payment method</div>;
  }
};
