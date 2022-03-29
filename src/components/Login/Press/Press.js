import React from "react";
import "./Press.scss";
import { Box, Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import ChartBg from "images/login/chartBg.svg";
import Yahoo from "images/login/press/yahoo.png";
import Forbes from "images/login/press/forbes.png";
import Bitcoin from "images/login/press/bitcoin.png";
import dayjs from "dayjs";
import PressQuote from "./PressQuote";

const quotes = [
  {
    date: dayjs("2021-04-14"),
    quote:
      "TheBull raises USD 3 Million in private sale to launch NFT-Based insurance protocol powered through their native utility token Zigcoin",
    url: "https://finance.yahoo.com/news/zignaly-raises-usd-3-million-130000802.html",
    logo: Yahoo,
  },
  {
    date: dayjs("2021-04-14"),
    quote:
      "TheBull has built a business to leverage the social predisposition of humans to lower the barrier of entry to cryptocurrency trading",
    url:
      "https://www.forbes.com/sites/tatianakoffman/2021/04/14/how-copy-trader-platforms-are-capitalizing-on-the-crypto-boom",
    logo: Forbes,
  },
  {
    date: dayjs("2021-04-14"),
    quote:
      "TheBull has created an environment where trading platforms, users and expert traders can benefit from one anothers input while contributing to a comprehensive ecosystem",
    url: "https://news.bitcoin.com/zignaly-lists-on-ascendex",
    logo: Bitcoin,
  },
];

const Press = () => {
  return (
    <Box className="press">
      <div className="chart">
        <img src={ChartBg} />
        <div className="slide" />
      </div>
    </Box>
  );
};

export default Press;
