import React from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useCountdown } from "../../helper/useCountdown";
import Minimum from "../../components/Cards/MinimumCard";
import DonateCard from "../../components/Cards/DonateCard";
import { useLocation } from "react-router-dom";

export const ProjectDetail = () => {
   const location = useLocation().state;
  const [days, hours, minutes, seconds] = useCountdown(location.project_deadline_date);
  function CountDownCard({ text1, text2, target }) {
    return (
      <>
        <div className="minimumCard">
          <h1>{text1}</h1>
          <p>
            {text2 === "countDown"
              ? `${days} days ${hours} hours ${minutes} minutes ${seconds}seconds`
              : text2}
          </p>
          {target && (
            <>
              <p>{`2.002 out of 5 ETH`}</p>
              <ProgressBar bgcolor={"hsla(0, 100%, 26%, 1)"} completed={47} />
            </>
          )}
        </div>
      </>
    );
  }
  return (
    <>
    <div className="container">
      <div className="detailHeader">
        <h1 className="heading">{location?.title}</h1>
        <div className="detailPage">
          <div className="left-detail">
            <p>
            {location.description}
            </p>
            <Minimum text1={"Minimum contribution"} text2={location?.project_minimum_fund_price} />
            <Minimum
              text1={"Wallet Address of Project Creator"}
              text2={location?.projectOwner}
            />
            <CountDownCard text1={"Deadline Countdown"} text2={"countDown"} />
          </div>

          <div className="right-detail">
            <Minimum
              text1={"Campaign Balance"}
              text2={"Target Reached"}
              target={true}
            />
            <DonateCard />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

