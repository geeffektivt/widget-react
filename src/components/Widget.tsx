import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DonationPane } from "./panes/DonationPane/DonationPane";
import { DonorPane } from "./panes/DonorPane/DonorPane";
import { MethodPane } from "./panes/MethodPane/MethodPane";
import { PaymentPane } from "./panes/PaymentPane/PaymentPane";
import { ReferralPane } from "./panes/ReferralPane/ReferralPane";
import { Carousel } from "./Carousel";
import "./Carousel.style.css";
import { fetchOrganizationsAction } from "../store/layout/actions";
import { State } from "../store/state";
import { fetchReferralsAction } from "../store/referrals/actions";

export const Widget: React.FC = () => {
  const dispatch = useDispatch();
  const answeredReferal = useSelector(
    (state: State) => state.layout.answeredReferral
  );

  useEffect(() => {
    dispatch(fetchOrganizationsAction.started(undefined));
    dispatch(fetchReferralsAction.started(undefined));
  }, []);

  return (
    <div id="app">
      <Carousel>
        <MethodPane />
        <DonorPane />
        <DonationPane />
        {answeredReferal !== true && <ReferralPane />}
        <PaymentPane />
      </Carousel>
    </div>
  );
};
