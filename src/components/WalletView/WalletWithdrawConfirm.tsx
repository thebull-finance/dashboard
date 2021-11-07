import React, { useEffect, useState } from "react";
import WalletIcon from "images/wallet/wallet.svg";
import { FormattedMessage } from "react-intl";
import { isMobile, Label, Modal, TextDesc, Title } from "styles/styles";
import styled, { css } from "styled-components";
import {
  Box,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import tradeApi from "services/tradeApiClient";
import CustomSelect from "components/CustomSelect";
import CopyIcon from "images/exchangeAccount/copy.svg";
import useClipboard from "hooks/useClipboard";
import QRCode from "qrcode.react";
import InfoIcon from "images/wallet/info.svg";
import { ErrorOutlineOutlined } from "@material-ui/icons";
import { NetworkCautionMessage } from "./WalletDepositView";
import { StyledCustomSelect } from "./styles";
import CustomButton from "components/CustomButton";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "store/actions/ui";
import ZIGIcon from "images/wallet/zignaly-coin.svg";
import useInterval from "hooks/useInterval";

const Button = styled(CustomButton)`
  margin-right: 8px;
  min-width: 121px;
`;

const AmountBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #413ba0;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  position: relative;

  &:first-child {
    margin-right: 16px;
  }

  ${(props) =>
    props.primary &&
    css`
      height: 120px;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(312.12deg, #8671f7 14.16%, #7ec9f9 83.59%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }
    `}
`;

const AmountLabel = styled(Typography)`
  color: ${(props) => props.theme.newTheme.secondaryText};
  font-weight: 600;
  font-size: ${(props) => (props.big ? "20px" : "12px")};
  margin-bottom: 8px;
`;

const Coin = styled(Typography)`
  color: ${(props) => props.theme.palette.text.secondary};
  margin-left: 4px;
  font-weight: 600;
  font-size: ${(props) => (props.big ? "32px" : "18px")};
  line-height: 24px;
`;

const AmountTypography = styled(Typography)`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;

  ${(props) =>
    props.big &&
    css`
      line-height: 60px;
      font-size: 48px;
    `}

  margin-left: 4px;
`;
interface WalletWithdrawConfirmProps {
  address: string;
  amount: string;
  network: string;
  coin: string;
}

const WalletWithdrawConfirm = ({
  address,
  amount,
  onClose,
  network,
  coin,
}: WalletWithdrawConfirmProps) => {
  const [fee, setFee] = useState<GetNetworkFeeRes>(null);
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFee = () => {
    tradeApi
      .getNetworkFee({ network, currency: coin })
      .then((response) => {
        setFee(response);
      })
      .catch((e) => {
        dispatch(showErrorAlert(e));
      });
  };
  useEffect(loadFee, []);
  useInterval(loadFee, 5000, false);

  const withdraw = () => {
    setLoading(true);
    tradeApi
      .walletWithdraw({ network, currency: coin, address, amount, fee: fee.key })
      .then(() => {
        setDone(true);
      })
      .catch((e) => {
        dispatch(showErrorAlert(e));
      });
  };

  const CoinAmount = ({ value, big = false }: { value: string; big: boolean }) => (
    <Box display="flex" flexDirection="row" alignItems="center">
      <img width={24} height={24} src={ZIGIcon} />
      <AmountTypography big={big}>
        <NumberFormat value={value} displayType="text" thousandSeparator={true} decimalScale={2} />
      </AmountTypography>
      <Coin big={big}>{coin}</Coin>
    </Box>
  );

  return (
    <Modal p={5}>
      <Title>
        <Box alignItems="center" display="flex">
          <img src={WalletIcon} width={40} height={40} />
          {done ? (
            <FormattedMessage id="wallet.withdraw.confirm" />
          ) : (
            <FormattedMessage id="wallet.withdraw.sent" />
          )}
        </Box>
      </Title>
      <TextDesc>
        {done ? (
          <FormattedMessage id="wallet.withdraw.sent.desc" />
        ) : (
          <FormattedMessage id="wallet.withdraw.confirm.desc" values={{ coin: "ZIG" }} />
        )}
      </TextDesc>
      <br />
      {!done ? (
        <>
          <Label style={{ marginTop: "24px" }}>
            <FormattedMessage id="wallet.withdraw.address" />
          </Label>
          {address}
          <Box display="flex" mt="64px" mb="16px">
            <AmountBox flex={2}>
              <AmountLabel>
                <FormattedMessage id="wallet.withdraw.amount" />
              </AmountLabel>
              <CoinAmount value={amount} />
            </AmountBox>
            <AmountBox flex={1}>
              <AmountLabel>
                <FormattedMessage id="wallet.withdraw.fee" />
              </AmountLabel>
              {fee ? (
                <CoinAmount value={fee.floatFee} />
              ) : (
                <CircularProgress size={21} style={{ margin: "0 auto" }} />
              )}
            </AmountBox>
          </Box>
          <AmountBox primary>
            <AmountLabel big={true}>
              <FormattedMessage id="wallet.withdraw.receive" />
            </AmountLabel>
            {fee ? (
              <CoinAmount big={true} value={parseFloat(amount) - parseFloat(fee.floatFee)} />
            ) : (
              <CircularProgress size={21} style={{ margin: "0 auto" }} />
            )}
          </AmountBox>
          <Box display="flex" flexDirection="row" mt="64px">
            <Button className="textPurple borderPurple" onClick={onClose}>
              <FormattedMessage id="accounts.back" />
            </Button>
            <Button className="bgPurple" onClick={withdraw} disabled={!fee} loading={loading}>
              <FormattedMessage id="wallet.withdraw.now" />
            </Button>
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="row" mt="64px">
          <Button className="bgPurple" href="">
            <FormattedMessage id="wallet.withdraw.view" />
          </Button>
        </Box>
      )}
    </Modal>
  );
};
export default WalletWithdrawConfirm;