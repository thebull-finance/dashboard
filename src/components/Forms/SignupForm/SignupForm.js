// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import "./SignupForm.scss";
import { Box, TextField, Checkbox } from "@material-ui/core";
import CustomButton from "../../CustomButton/CustomButton";
import { useForm, Controller } from "react-hook-form";
import Passwords from "../../Passwords";
import { projectId } from "../../../utils/defaultConfigs";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import useHasMounted from "../../../hooks/useHasMounted";
import { emailRegex } from "utils/validators";
import useStoreSettingsSelector from "hooks/useStoreSettingsSelector";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CaptchaTerms from "components/Captcha/CaptchaTerms";
// import Captcha from "../../Captcha";
import { showErrorAlert } from "store/actions/ui";
import tradeApi from "services/tradeApiClient";
import { startTradeApiSession } from "store/actions/session";
import Modal from "../../Modal";
import VerifyEmailForm from "../VerifyEmailForm";
import { setUserId } from "store/actions/user";

//import { connect } from "../../../store/blockchain/blockchainActions";
//import { fetchData } from "../../../store/data/dataActions";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const { locale } = useStoreSettingsSelector();
  const [ref] = useState("");
  const formMethods = useForm();
  const { errors, handleSubmit, register, clearErrors, control } = formMethods;
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const intl = useIntl();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const captchaFallback = useRef(null);
  const isCheckly =
    typeof window !== "undefined" && window.navigator.userAgent.toLowerCase().includes("checkly");
  const [loginResponse, setLoginResponse] = useState(null);

  ////////////////////////////////////
  // const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  // const [claimingNft, setClaimingNft] = useState(false);
  // const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  // const [mintAmount, setMintAmount] = useState(1);
  // const [CONFIG, SET_CONFIG] = useState({
  //   CONTRACT_ADDRESS: "0x77ba7ad358f7251feac94e105e3adf64053e80e9",
  //   SCAN_LINK: "https://bscscan.com/token/0x77ba7ad358f7251feac94e105e3adf64053e80e9#balances",
  //   NETWORK: {
  //     NAME: "Binance Smart Chain",
  //     SYMBOL: "BNB",
  //     ID: 56,
  //   },
  //   NFT_NAME: "Zeon land",
  //   SYMBOL: "LAND",
  //   MAX_SUPPLY: 3000,
  //   WEI_COST: 1000000000000000000,
  //   DISPLAY_COST: 1,
  //   GAS_LIMIT: 90000,
  //   MARKETPLACE: "OpenSea",
  //   MARKETPLACE_LINK: "https://zeon.world",
  //   SHOW_BACKGROUND: true,
  // });
  // const claimNFTs = () => {
  //   let cost = CONFIG.WEI_COST;
  //   let gasLimit = CONFIG.GAS_LIMIT;
  //   let totalCostWei = String(cost * mintAmount);
  //   let totalGasLimit = String(gasLimit * mintAmount);
  //   console.log("Cost: ", totalCostWei);
  //   console.log("Gas limit: ", totalGasLimit);
  //   setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
  //   setClaimingNft(true);
  //   blockchain.smartContract.methods
  //     .mint(mintAmount)
  //     .send({
  //       gasLimit: String(totalGasLimit),
  //       to: CONFIG.CONTRACT_ADDRESS,
  //       from: blockchain.account,
  //       value: totalCostWei,
  //     })
  //     .once("error", (err) => {
  //       console.log(err);
  //       setFeedback("Sorry, something went wrong please try again later.");
  //       setClaimingNft(false);
  //     })
  //     .then((receipt) => {
  //       console.log(receipt);
  //       setFeedback(
  //         `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
  //       );
  //       setClaimingNft(false);
  //       dispatch(fetchData(blockchain.account));
  //     });
  // };

  // const getData = () => {
  //   if (blockchain.account !== "" && blockchain.smartContract !== null) {
  //     dispatch(fetchData(blockchain.account));
  //   }
  // };

  // const getConfig = async () => {
  //   const configResponse = await fetch("/config/config.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });
  //   const config = await configResponse.json();
  //   SET_CONFIG(config);
  // };

  // useEffect(() => {
  //   getConfig();
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [blockchain.account]);

  ////////////////////////////////////

  if (!hasMounted) {
    // Don't render form statically
    return null;
  }

  /**
   *
   * @typedef {Object} DataObject
   * @property {String} password
   * @property {String} repeatPassword
   * @property {String} firstName
   * @property {String} email
   * @property {Boolean} subscribe
   * @property {Boolean} terms
   * @property {string} [gRecaptchaResponse] Captcha token fallback
   */

  /**
   *
   * @param {DataObject} data Data object received byt submitting the form.
   * @returns {Promise<void>} None.
   */
  const onSubmit = async (data) => {
    setLoading(true);
    let gRecaptchaResponse = data.gRecaptchaResponse || "";
    let c = 2;
    if (!isCheckly && process.env.NODE_ENV === "production" && !gRecaptchaResponse) {
      gRecaptchaResponse = await executeRecaptcha("signup");
      c = 3;
    }
    const payload = {
      projectId: projectId,
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      subscribe: data.subscribe,
      ref: ref,
      array: true,
      terms: data.terms,
      locale,
      gRecaptchaResponse,
      c,
    };

    tradeApi
      .userRegister(payload)
      .then((response) => {
        // Store userId for tracking purposes
        dispatch(setUserId(response.userId));
        // Store login response and show verification modal
        setLoginResponse(response);
        captchaFallback.current = null;
      })
      .catch((e) => {
        // if (e.code === 76) {
        //   // Use old captcha as fallback
        //   captchaFallback.current = (/** @type {string} */ captcha) =>
        //     onSubmit({ ...data, gRecaptchaResponse: captcha });
        // } else {
        dispatch(showErrorAlert(e));
        // }
        setLoading(false);
      });
  };

  const onVerified = () => {
    dispatch(startTradeApiSession(loginResponse, "signup"));
  };

  return (
    <>
      <form method="post" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* <Captcha onSuccess={captchaFallback.current} /> */}
        <Modal
          onClose={() => {}}
          persist={true}
          showCloseIcon={false}
          size="small"
          state={Boolean(loginResponse)}
        >
          <VerifyEmailForm onComplete={onVerified} token={loginResponse?.token} />
        </Modal>
        <Box
          alignItems="center"
          className="signupForm"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            alignItems="start"
            className="inputBox"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <label className="customLabel">
              <FormattedMessage id="security.name" />
            </label>
            <TextField
              className="customInput"
              error={!!errors.firstName}
              fullWidth
              inputRef={register({
                required: intl.formatMessage({ id: "form.error.firstname" }),
                minLength: {
                  value: 3,
                  message: intl.formatMessage({ id: "form.error.firstname.length" }),
                },
                maxLength: {
                  value: 20,
                  message: intl.formatMessage({ id: "form.error.firstname.maxlength" }),
                },
              })}
              name="firstName"
              type="text"
              variant="outlined"
            />
            {errors.firstName && <span className="errorText">{errors.firstName.message}</span>}
          </Box>
          <Box
            alignItems="start"
            className="inputBox"
            display="flex"
            flexDirection="column"
            justifyContent="start"
          >
            <label className="customLabel">
              <FormattedMessage id="security.email" />
            </label>
            <TextField
              className="customInput"
              error={!!errors.email}
              fullWidth
              inputRef={register({
                required: intl.formatMessage({ id: "security.email.error.empty" }),
                pattern: {
                  value: emailRegex,
                  message: intl.formatMessage({ id: "security.email.error.invalid" }),
                },
              })}
              name="email"
              type="email"
              variant="outlined"
            />
            {errors.email && <span className="errorText">{errors.email.message}</span>}
          </Box>

          <Passwords edit={false} formMethods={formMethods} />

          <Box className="inputBox checkbox">
            <Box alignItems="center" display="flex" flexDirection="row" justifyContent="start">
              <Checkbox
                className="checkboxInput"
                defaultChecked={true}
                inputRef={register({ required: true })}
                name="terms"
                onChange={() => clearErrors("terms")}
              />
              <Box
                className={"termsBox " + (errors.terms ? " error" : "")}
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="start"
              >
                <FormattedMessage
                  id="signup.agreement"
                  values={{
                    terms: (
                      <a
                        className="link"
                        href="https://zignaly.com/legal/terms"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FormattedMessage id="signup.terms" />
                      </a>
                    ),
                    privacy: (
                      <a
                        className="link"
                        href="https://zignaly.com/legal/privacy"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FormattedMessage id="signup.privacy" />
                      </a>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box className="inputBox checkbox">
            <Box alignItems="center" display="flex" flexDirection="row" justifyContent="start">
              <Controller
                control={control}
                defaultValue={true}
                name="subscribe"
                render={({ onChange, value }) => (
                  <Checkbox
                    checked={value}
                    className="checkboxInput"
                    onChange={(e) => onChange(e.target.checked)}
                  />
                )}
              />
              <span className="termsText">Subscribe to notifications</span>
            </Box>
          </Box>
          <a href="https://nft.thebull.finance" style={{textDecoration:"none"}}>
          <Box className="inputBox buttonBox">

            <CustomButton className={"full submitButton"} loading={loading} >
             Connect to Metamask
            </CustomButton>

          </Box>
          </a>
        </Box>
      </form>
      {/* <>
      {blockchain.account === "" ||
        blockchain.smartContract === null ? (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
              getData();
            }}
          >
            CONNECT
          </button>
          {blockchain.errorMsg !== "" ? (
            <>
              {blockchain.errorMsg}
            </>
          ) : null}
        </>
      ) : (
        <>
          <button
            disabled={claimingNft ? true : false}
            onClick={(e) => {
              e.preventDefault();
              claimNFTs();
              getData();
            }}
          >
            {claimingNft ? "BUSY" : "BUY"}
          </button>
        </>
      )}
    </> */}
      <CaptchaTerms />
    </>
  );
};

export default SignupForm;
