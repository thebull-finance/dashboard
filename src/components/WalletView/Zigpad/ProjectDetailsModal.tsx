import { Box, Chip, CircularProgress, Typography } from "@material-ui/core";
import { Link, DescriptionOutlined, Check } from "@material-ui/icons";
import CustomModal from "components/Modal";
import React, { useContext, useEffect, useState } from "react";
import { isMobile, Modal } from "styles/styles";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { css } from "styled-components";
import NumberFormat from "react-number-format";
import dayjs from "dayjs";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab";
import { formatDateTime } from "utils/format";
import SocialIcon from "./SocialIcon";
import PledgeModal from "./PledgeModal";
import tradeApi from "services/tradeApiClient";
import { PledgeButton } from "../Vault/VaultDepositButton";
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";
import PrivateAreaContext from "context/PrivateAreaContext";
import WalletDepositView from "../WalletDepositView";
import { gateioUrl, zigpadInfoUrl } from "utils/affiliateURLs";
import OpenArrowIcon from "images/launchpad/openArrow.inline.svg";
import useInterval from "hooks/useInterval";
import Button from "components/Button";
import { CategoryIcon } from "./Zigpad";
import cloudinary from "services/cloudinary";
import CoinIcon from "../CoinIcon";
import DOMPurify from "dompurify";
import { format2Dec, formatPrice } from "utils/formatters";
import BuyZIGModal from "../BuyZIGModal/BuyZIGModal";

const TitleContainer = styled(Box)`
  ${isMobile(css`
    margin-bottom: 6px;
  `)}
`;

const MetricDetails = styled.div`
  margin-right: 80px;
`;

const MetricItem = styled(Typography)`
  font-weight: 600;
  margin-bottom: 16px;
`;

const MetricLabel = styled(Typography)`
  font-weight: 600;
  color: ${(props) => props.theme.newTheme.secondaryText};
`;

const Coin = styled.span`
  color: #65647e;
  font-size: 14px;
  margin-left: 12px;
`;

const TitleDesc = styled(Typography)`
  font-weight: 500;
  font-size: 32px;
  margin-left: 18px;
`;

const MiniIconLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noreferrer",
}))`
  display: flex;
  justify-content: center;
  margin-right: 14px;
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => props.theme.newTheme.secondaryText};

  span {
    margin-left: 4px;
  }
`;

const StyledModal = styled(Modal)`
  align-items: flex-start;

  ${isMobile(css`
    margin-bottom: 40px;
  `)}
`;

const StyledTimeline = styled(Timeline)`
  width: 100%;
  padding: 0;
  margin: 0;

  .MuiTimelineItem-missingOppositeContent:before {
    flex: initial;
  }
`;

const NestedTimeline = styled(StyledTimeline)`
  margin-top: 18px;

  .MuiTimelineItem-missingOppositeContent:before {
    display: none;
  }
`;

const TimelineLabel = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.palette.primary.main : props.theme.newTheme.secondaryText};
  font-weight: ${(props) => (props.active ? 700 : 400)};
  font-size: 16px;
  margin-bottom: 6px;
`;

const MetricsBox = styled(Box)`
  ${isMobile(css`
    flex-direction: column;
  `)}
`;

const CoinBox = styled(Box)`
  ${isMobile(css`
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

const Subtitle = styled(Typography).attrs(() => ({
  variant: "h3",
}))`
  margin: 26px 0 14px;
`;

const List = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  margin: 0;

  li:last-child {
    margin-bottom: 0;
  }
`;

const ListItem = styled.li`
  color: ${(props) => props.theme.newTheme.secondaryText};
  margin-bottom: 16px;
`;

const ItemLabel = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-right: 8px;
`;

const ItemValue = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.palette.text.primary};
`;

const StyledPledgeButton = styled.div`
  display: flex;
  justify-content: center;

  > div {
    padding: 5px 11px;
    height: 32px;
  }

  button {
    min-width: 150px;
    min-height: 48px;
  }

  > div,
  button {
    margin: 16px 42px;

    ${isMobile(css`
      margin: 16px 0px 7px;
    `)}
  }
`;

const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;

  ${isMobile(`
    flex-direction: column;
    margin: 12px 0;
  `)}
`;

const CountdownPanel = styled(Typography)`
  background: ${(props) => props.theme.newTheme.backgroundAltColor};
  padding: 18px;
  max-width: 740px;
  border-radius: 4px;
  margin-top: 12px;

  ${isMobile(`
    text-align: center;
  `)}
`;

const CountdownText = styled(Typography)`
  margin-right: 80px;
  font-size: 16px;
  ${isMobile(`
    margin: 0 0 6px;
  `)}
`;

const CountdownDigit = styled(Typography)`
  font-size: 18px;
  ${({ theme }) => css`
    border: 1px solid ${theme.newTheme.borderColor2};
  `}
  padding: 4px;
  margin: 0 5px 0 17px;
  font-weight: 700;
`;

const ZigAmount = styled(Typography)`
  margin-bottom: 8px;
  span {
    font-weight: 700;
  }
`;

const Divider = styled.span`
  background: ${({ theme }) => (theme.palette.type === "dark" ? "#222249" : "#CCCAEF")};
  width: 1px;
  height: 100%;
  position: absolute;

  ${isMobile(`
    display: none;
  `)}
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  margin-top: 18px;

  ${isMobile(`
    flex-direction: column;
    align-items: center;
  `)}
`;

const ButtonDesc = styled(Typography)`
  color: ${({ theme }) => theme.newTheme.secondaryText};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  text-align: center;
  justify-content: space-between;

  ${isMobile(css`
    width: 100%;
    align-items: center;

    &:last-child {
      margin-top: 14px;
    }

    button,
    a {
      width: 200px;
    }
  `)}

  p {
    margin-bottom: 10px;
    font-size: 15px;
  }
`;

const StyledTimelineDot = styled(TimelineDot)`
  width: 24px;
  height: 24px;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, color }) =>
    theme.palette.type === "dark" &&
    color === "grey" &&
    css`
      color: #36373f;
    `}
`;

const CheckIcon = styled(Check)`
  width: 18px;
  height: 18px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const MultiInlines = styled.div`
  display: inline-flex;
  width: calc(100% - 30px);

  span:nth-child(1) {
    white-space: nowrap;
  }

  span:nth-child(2) {
    white-space: pre-wrap;
  }
`;

const Paragraph = styled(Typography)`
  white-space: pre-wrap;
`;

const CustomTimelineDot = ({
  done,
  active,
  step,
}: {
  done: boolean;
  active: boolean;
  step: number;
}) => {
  return (
    <StyledTimelineDot color={active ? "primary" : "grey"}>
      {done ? <CheckIcon /> : step}
    </StyledTimelineDot>
  );
};

export const getStep = (project: LaunchpadProjectDetails) => {
  if (project) {
    if (dayjs().isAfter(project.distributionPeriods[0].dateFrom)) {
      // Distribution period
      return 5;
    }
    if (dayjs().isAfter(project.vestingDate)) {
      // Vesting period
      return 4;
    }
    if (dayjs().isAfter(project.calculationDate)) {
      // Calculation period
      return 3;
    }
    if (dayjs().isAfter(project.startDate)) {
      // Subscription period
      return 2;
    }
  }

  return 1;
};

const rendererCountdown = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
  if (completed) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center">
      <CountdownDigit>{zeroPad(days)}</CountdownDigit>
      <FormattedMessage id="zigpad.days" />
      <CountdownDigit>{zeroPad(hours)}</CountdownDigit>
      <FormattedMessage id="zigpad.hours" />
      <CountdownDigit>{zeroPad(minutes)}</CountdownDigit>
      <FormattedMessage id="zigpad.mins" />
      <CountdownDigit>{zeroPad(seconds)}</CountdownDigit>
      <FormattedMessage id="zigpad.secs" />
    </Box>
  );
};

const DistributionTimeline = ({ project }: { project: LaunchpadProjectDetails }) => {
  const currentIndex = project.distributionPeriods.findIndex((d) => !d.finished);
  return (
    <NestedTimeline>
      {project.distributionPeriods.map((d, i) => (
        <TimelineItem key={d.dateFrom}>
          <TimelineSeparator>
            <CustomTimelineDot done={currentIndex > i} active={currentIndex === i} step={i + 1} />
            {i < project.distributionPeriods.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <TimelineLabel active={currentIndex === i}>
              {formatDateTime(d.dateFrom)}
              {d.type !== "ONCE" && <> - {formatDateTime(d.dateTo)}</>}
            </TimelineLabel>
            <ItemValue>
              <FormattedMessage
                id={`zigpad.distribution.release${
                  d.type === "WEEK" ? ".weekly" : d.type === "DAY" ? ".daily" : ""
                }`}
                values={{
                  perc: parseFloat(d.percent),
                  amount: (
                    <NumberFormat
                      value={formatPrice((parseFloat(d.percent) / 100) * project.tokenReward)}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={` ${project.coin}`}
                    />
                  ),
                  coin: project.coin,
                }}
              />
            </ItemValue>
          </TimelineContent>
        </TimelineItem>
      ))}
    </NestedTimeline>
  );
};

const currentDistributionDate = (project: LaunchpadProjectDetails) =>
  project.distributionPeriods.find((d) => !d.finished);

const DistributionContent = ({
  project,
  step,
}: {
  project: LaunchpadProjectDetails;
  step: number;
}) => {
  const distributionDate = currentDistributionDate(project);
  const timesOversubscribed = project.usdSubscription / project.tokenomic.hardCap;

  return (
    <>
      {step >= 4 && (
        <CountdownPanel>
          {!project.pledged ? (
            <>
              <FormattedMessage
                id={
                  timesOversubscribed > 1
                    ? "zigpad.distribution.missed.overpledged"
                    : "zigpad.distribution.missed"
                }
                values={{
                  pledged: (
                    <NumberFormat
                      value={project.totalPledge}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" ZIG"
                    />
                  ),
                  times: format2Dec(timesOversubscribed),
                }}
              />
              <br />
              <FormattedMessage id="zigpad.distribution.missed.plan" />
            </>
          ) : (
            <>
              <FormattedMessage
                id={
                  timesOversubscribed > 1
                    ? "zigpad.distribution.overpledged"
                    : "zigpad.distribution.pledged"
                }
                values={{
                  reward: (
                    <NumberFormat
                      value={project.tokenReward}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={` ${project.coin}`}
                    />
                  ),
                  realPledged: (
                    <NumberFormat
                      value={project.pledged - project.returned}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" ZIG"
                      decimalScale={2}
                    />
                  ),
                  returned: (
                    <NumberFormat
                      value={project.returned}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" ZIG"
                    />
                  ),
                  pledged: (
                    <NumberFormat
                      value={project.totalPledge}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" ZIG"
                    />
                  ),
                  times: format2Dec(timesOversubscribed),
                  a: (chunks: string) => (
                    <a target="_blank" rel="noreferrer" className="link" href={zigpadInfoUrl}>
                      {chunks}
                    </a>
                  ),
                }}
              />
              <br />
              <FormattedMessage id="zigpad.distribution.plan" />
            </>
          )}
        </CountdownPanel>
      )}
      {step >= 4 && (
        <>
          <DistributionTimeline project={project} />
          {project.pledged > 0 && (
            <CountdownContainer style={{ marginTop: "8px" }}>
              <CountdownText style={{ marginRight: "39px" }}>
                {distributionDate ? (
                  <FormattedMessage id="zigpad.distribution.next" />
                ) : (
                  <FormattedMessage id="zigpad.distribution.done" />
                )}
              </CountdownText>
              {distributionDate && (
                <Countdown date={distributionDate.dateFrom} renderer={rendererCountdown} />
              )}
            </CountdownContainer>
          )}
        </>
      )}
    </>
  );
};

interface ProjectDetailsModalProps {
  onClose: () => void;
  onPledged?: () => void;
  open: boolean;
  projectId: number;
}

const ProjectDetailsModal = ({ onClose, onPledged, open, projectId }: ProjectDetailsModalProps) => {
  const [pledgeModal, showPledgeModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState<LaunchpadProjectDetails>(null);
  const intl = useIntl();
  const { walletBalance, setWalletBalance } = useContext(PrivateAreaContext);
  const balanceZIG = walletBalance?.ZIG?.total?.availableBalance || 0;
  const [depositZIG, showDepositZIG] = useState(false);
  const [coins, setCoins] = useState<WalletCoins>(null);
  const [step, setStep] = useState(1);
  // const [rateZIG, setRateZIG] = useState(null);
  const [buyZIG, showBuyZIG] = useState(false);
  const [updateAt, setUpdateAt] = useState(null);

  useInterval(
    () => {
      setStep(getStep(projectDetails));
    },
    1000,
    false,
  );

  useEffect(() => {
    setStep(getStep(projectDetails));
  }, [projectDetails]);

  useEffect(() => {
    tradeApi.getLaunchpadProjectDetails(projectId).then((response) => {
      setProjectDetails(response);
    });

    tradeApi.getWalletCoins().then((response) => {
      setCoins(response);
    });
  }, []);

  useEffect(() => {
    tradeApi.getWalletBalance().then((response) => {
      setWalletBalance(response);
    });
  }, [updateAt]);

  const handlePledged = (amount: number) => {
    setProjectDetails({
      ...projectDetails,
      pledged: amount,
    });
    showPledgeModal(false);
    if (onPledged) {
      onPledged();
    }
  };

  return (
    <CustomModal
      onClose={onClose}
      newTheme={true}
      persist={false}
      size="large"
      state={open}
      style={!isMobile ? { width: "1000px" } : null}
    >
      <CustomModal
        onClose={() => showDepositZIG(false)}
        newTheme={true}
        persist={false}
        size="medium"
        state={depositZIG}
      >
        <WalletDepositView coins={coins} onClose={() => showDepositZIG(false)} coin="ZIG" />
      </CustomModal>
      {buyZIG && (
        <BuyZIGModal
          onClose={() => showBuyZIG(false)}
          onDone={() => {
            showBuyZIG(false);
            setUpdateAt(new Date());
          }}
          open={buyZIG}
        />
      )}
      <StyledModal>
        {projectDetails ? (
          <>
            <CustomModal
              onClose={() => showPledgeModal(false)}
              size="medium"
              state={pledgeModal}
              newTheme={true}
            >
              <PledgeModal project={projectDetails} onPledged={handlePledged} />
            </CustomModal>
            <CoinBox display="flex" justifyContent="space-between" width={1} mb={2}>
              <TitleContainer display="flex" alignItems="center">
                <CoinIcon coin={projectDetails.coin} width={64} height={64} />
                <TitleDesc>{projectDetails.name}</TitleDesc>
                <Coin>{projectDetails.coin}</Coin>
              </TitleContainer>
              {step === 2 && (
                <StyledPledgeButton>
                  <PledgeButton onClick={() => showPledgeModal(true)} project={projectDetails} />
                </StyledPledgeButton>
              )}
            </CoinBox>
            <Chip
              style={{ marginBottom: "12px" }}
              size="small"
              label={
                <Box display="flex" alignItems="center">
                  <CategoryIcon category={projectDetails.category} width={18} height={18} />
                  <FormattedMessage
                    id={`zigpad.category.${projectDetails.category.toLowerCase()}`}
                  />
                </Box>
              }
            />
            <ItemValue>{projectDetails.shortDescription}</ItemValue>
            <Box display="flex" mt={2} mb={3}>
              <MiniIconLink href={projectDetails.website}>
                <Link />
                <FormattedMessage id="srv.edit.website" tagName="span" />
              </MiniIconLink>
              <MiniIconLink href={projectDetails.whitepaper}>
                <DescriptionOutlined />
                <FormattedMessage id="zigpad.whitepaper" tagName="span" />
              </MiniIconLink>
              <MiniIconLink href={"https://github.com/thebull-finance/FAQ/issues?q=is%3Aissue+is%3Aclosed"}>
                <DescriptionOutlined />
                <FormattedMessage id="zigpad.faq" tagName="span" />
              </MiniIconLink>
              {projectDetails.socials.map((s, i) => (
                <MiniIconLink href={s.url} key={i}>
                  <SocialIcon type={s.name} />
                </MiniIconLink>
              ))}
            </Box>
            <Subtitle>
              <FormattedMessage id="zigpad.subscriptionInfo" />
            </Subtitle>
            <MetricsBox display="flex">
              <MetricDetails>
                <MetricLabel>
                  <FormattedMessage id="terminal.price" />
                </MetricLabel>
                <MetricItem>
                  <NumberFormat
                    displayType="text"
                    value={projectDetails.price}
                    prefix={`1 ${projectDetails.coin} = $`}
                    thousandSeparator={true}
                  />
                </MetricItem>
              </MetricDetails>
              <MetricDetails>
                <MetricLabel>
                  <FormattedMessage id="zigpad.offered" />
                </MetricLabel>
                <MetricItem>
                  <NumberFormat
                    displayType="text"
                    value={projectDetails.offeredAmount}
                    suffix={` ${projectDetails.coin}`}
                    thousandSeparator={true}
                  />
                </MetricItem>
              </MetricDetails>
              <MetricDetails>
                <MetricLabel>
                  <FormattedMessage id="zigpad.minContribution" />
                </MetricLabel>
                <MetricItem>
                  <NumberFormat
                    displayType="text"
                    value={projectDetails.minAmount}
                    suffix=" ZIG"
                    thousandSeparator={true}
                  />
                </MetricItem>
              </MetricDetails>
              <MetricDetails>
                <MetricLabel>
                  <FormattedMessage id="zigpad.maxContribution" />
                </MetricLabel>
                <MetricItem>
                  {parseFloat(projectDetails.maxAmount) ? (
                    <NumberFormat
                      displayType="text"
                      value={projectDetails.maxAmount}
                      suffix=" ZIG"
                      thousandSeparator={true}
                    />
                  ) : (
                    "N/A"
                  )}
                </MetricItem>
              </MetricDetails>
            </MetricsBox>
            <Subtitle>
              <FormattedMessage id="zigpad.subscriptionTimeline" />
            </Subtitle>
            <StyledTimeline>
              <TimelineItem>
                <TimelineSeparator>
                  <CustomTimelineDot done={step > 1} active={step === 1} step={1} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineLabel active={step === 1}>
                    <FormattedMessage id="zigpad.getready" />
                  </TimelineLabel>
                  <ItemValue>{formatDateTime(projectDetails.getReadyDate)}</ItemValue>
                  {step === 1 && (
                    <>
                      <CountdownContainer>
                        <CountdownText>
                          <FormattedMessage id="zigpad.timeLeftStart" />
                        </CountdownText>
                        <Countdown date={projectDetails.startDate} renderer={rendererCountdown} />
                      </CountdownContainer>
                      <CountdownPanel>
                        <ZigAmount>
                          <FormattedMessage id="zigpad.youHave" />
                          &nbsp;
                          <NumberFormat
                            value={balanceZIG}
                            thousandSeparator={true}
                            displayType="text"
                            suffix=" ZIG"
                          />
                        </ZigAmount>
                        <ZigAmount>
                          <FormattedMessage id="zigpad.getMore" />
                        </ZigAmount>
                        <ButtonsContainer>
                          <ButtonBox>
                            <ButtonDesc>
                              <FormattedMessage id="zigpad.deposit.desc" />
                            </ButtonDesc>
                            <Button onClick={() => showDepositZIG(true)}>
                              <FormattedMessage id="accounts.deposit" />
                              &nbsp;ZIG
                            </Button>
                          </ButtonBox>
                          <Divider />
                          <ButtonBox>
                            <ButtonDesc>
                              <FormattedMessage id="zigpad.buy.desc" />
                            </ButtonDesc>
                            <Button onClick={() => showBuyZIG(true)}>
                              <FormattedMessage id="zigpad.buy" />
                            </Button>
                          </ButtonBox>
                        </ButtonsContainer>
                      </CountdownPanel>
                    </>
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <CustomTimelineDot done={step > 2} active={step === 2} step={2} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineLabel active={step === 2}>
                    <FormattedMessage id="zigpad.subscriptionPeriod" />
                  </TimelineLabel>
                  <ItemValue>{formatDateTime(projectDetails.startDate)}</ItemValue>
                  {step === 2 && (
                    <>
                      <CountdownContainer>
                        <CountdownText>
                          <FormattedMessage id="zigpad.timeLeftEnd" />
                        </CountdownText>
                        <Countdown
                          date={projectDetails.calculationDate}
                          renderer={rendererCountdown}
                        />
                      </CountdownContainer>
                      <CountdownPanel>
                        <FormattedMessage id="zigpad.subscription.participate" />
                        <StyledPledgeButton>
                          <PledgeButton
                            onClick={() => showPledgeModal(true)}
                            project={projectDetails}
                          />
                        </StyledPledgeButton>
                      </CountdownPanel>
                    </>
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <CustomTimelineDot done={step > 3} active={step === 3} step={3} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineLabel active={step === 3}>
                    <FormattedMessage id="zigpad.calculationPeriod" />
                  </TimelineLabel>
                  <ItemValue>{formatDateTime(projectDetails.calculationDate)}</ItemValue>
                  {step === 3 && (
                    <CountdownContainer>
                      <CountdownText>
                        <FormattedMessage id="zigpad.calculation.progress" />
                      </CountdownText>
                    </CountdownContainer>
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <CustomTimelineDot
                    done={!currentDistributionDate(projectDetails)}
                    active={step >= 4 && Boolean(currentDistributionDate(projectDetails))}
                    step={4}
                  />
                </TimelineSeparator>
                <TimelineContent>
                  <TimelineLabel active={step === 4}>
                    <FormattedMessage id="zigpad.distributionPeriod" />
                  </TimelineLabel>
                  <ItemValue>
                    {formatDateTime(projectDetails.distributionPeriods[0].dateFrom)}
                    {projectDetails.distributionPeriods.length > 1 ? (
                      <>
                        &nbsp;-&nbsp;
                        {formatDateTime(
                          projectDetails.distributionPeriods[
                            projectDetails.distributionPeriods.length - 1
                          ].dateTo,
                        )}
                      </>
                    ) : (
                      projectDetails.distributionPeriods[0].type !== "ONCE" && (
                        <>
                          &nbsp;-&nbsp;
                          {formatDateTime(projectDetails.distributionPeriods[0].dateFrom)}
                        </>
                      )
                    )}
                  </ItemValue>
                  <DistributionContent step={step} project={projectDetails} />
                </TimelineContent>
              </TimelineItem>
            </StyledTimeline>
            <Subtitle>
              <FormattedMessage id="zigpad.highlights" />
            </Subtitle>
            <Paragraph>{projectDetails.highlights}</Paragraph>
            {projectDetails.additionalInfo && (
              <>
                <Subtitle>
                  <FormattedMessage id="zigpad.additionalInfo" />
                </Subtitle>
                <Paragraph>{projectDetails.additionalInfo}</Paragraph>
              </>
            )}
            <Box style={{ maxWidth: "900px" }}>
              <Subtitle>
                <FormattedMessage id="zigpad.tokenomic" />
              </Subtitle>
              <List>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.hardCap" />
                  </ItemLabel>
                  <ItemValue>
                    <NumberFormat
                      value={projectDetails.tokenomic.hardCap}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" USD"
                    />
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.supply" />
                  </ItemLabel>
                  <ItemValue>
                    <NumberFormat
                      value={projectDetails.tokenomic.supplyTotalCap}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={` ${projectDetails.coin}`}
                    />
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.supplyInitial" />
                  </ItemLabel>
                  <ItemValue>
                    <NumberFormat
                      value={projectDetails.tokenomic.supplyInitial}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={` ${projectDetails.coin}`}
                    />
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.publicSalePrice" />
                  </ItemLabel>
                  <ItemValue>
                    <NumberFormat
                      value={projectDetails.tokenomic.publicSalePrice}
                      thousandSeparator={true}
                      displayType="text"
                      suffix=" USD"
                    />
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.offered" />
                  </ItemLabel>
                  <ItemValue>
                    <NumberFormat
                      value={projectDetails.tokenomic.tokensOffered}
                      thousandSeparator={true}
                      displayType="text"
                      suffix={` ${projectDetails.coin}`}
                    />
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.hardCapUser" />
                  </ItemLabel>
                  <ItemValue>
                    {parseFloat(projectDetails.maxAmount) ? (
                      <NumberFormat
                        displayType="text"
                        value={projectDetails.maxAmount}
                        suffix=" ZIG"
                        thousandSeparator={true}
                      />
                    ) : (
                      "N/A"
                    )}
                  </ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.type" />
                  </ItemLabel>
                  <ItemValue>{projectDetails.tokenomic.chain}</ItemValue>
                </ListItem>
                <ListItem>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.tokenomic.tokenSaleVestingPeriod" />
                  </ItemLabel>
                  <ItemValue>{projectDetails.tokenomic.tokenSaleVestingPeriod}</ItemValue>
                </ListItem>
                <ListItem>
                  <MultiInlines>
                    <ItemLabel>
                      <FormattedMessage id="zigpad.tokenomic.tokenDistribution" />
                    </ItemLabel>
                    <ItemValue>
                      {projectDetails.distributionPeriods.map((d) => (
                        <div key={d.dateFrom}>
                          <FormattedMessage
                            id={`zigpad.tokenomic.release${
                              d.type === "WEEK" ? ".weekly" : d.type === "DAY" ? ".daily" : ""
                            }`}
                            values={{
                              perc: d.percent,
                              date: dayjs(d.dateFrom).format("MMM D, YYYY"),
                              dateTo: dayjs(d.dateTo).format("MMM D, YYYY"),
                            }}
                          />
                        </div>
                      ))}
                    </ItemValue>
                  </MultiInlines>
                </ListItem>
              </List>
              <Subtitle>
                <FormattedMessage id="zigpad.previousRounds" />
              </Subtitle>
              <ListItem>
                <MultiInlines>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.privateRound" />
                  </ItemLabel>
                  <ItemValue>{projectDetails.privateRound || " - "}</ItemValue>
                </MultiInlines>
              </ListItem>
              <ListItem>
                <MultiInlines>
                  <ItemLabel>
                    <FormattedMessage id="zigpad.otherRound" />
                  </ItemLabel>
                  <ItemValue>{projectDetails.publicRound || " - "}</ItemValue>
                </MultiInlines>
              </ListItem>
              <Subtitle>
                <FormattedMessage id="zigpad.distribution" />
              </Subtitle>
              <Typography>
                <Image
                  src={cloudinary({ folder: "zigpad", id: `${projectDetails.id}_tokenomics` })}
                />
              </Typography>
            </Box>
            <Subtitle>
              <FormattedMessage id="zigpad.rules" />
            </Subtitle>
            <Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(projectDetails.launchpadRules),
                }}
              />
            </Typography>
            <Subtitle>
              <FormattedMessage id="srv.disclaimer.title" />
            </Subtitle>
            <Typography>{projectDetails.terms}</Typography>
          </>
        ) : (
          <CircularProgress size={50} style={{ margin: "0 auto" }} />
        )}
      </StyledModal>
    </CustomModal>
  );
};

export default ProjectDetailsModal;
