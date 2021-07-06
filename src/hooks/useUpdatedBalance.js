import { useState, useEffect } from "react";
import tradeApi from "../services/tradeApiClient";
import useInterval from "./useInterval";
import useStoreSettingsSelector from "./useStoreSettingsSelector";
import { useDispatch } from "react-redux";
import { showErrorAlert, showBalanceLoader } from "../store/actions/ui";
import useStoreUIBalanceLoader from "./useStoreUIBalanceLoader";
import { createEmptyUserBalanceEntity } from "../services/tradeApiClient.types";

/**
 * @typedef {import("../services/tradeApiClient.types").UserBalanceEntity} UserBalanceEntity
 */

/**
 * Provides balance summary for exchange.
 *
 * @returns {UserBalanceEntity} Balance.
 */
const useUpdatedBalance = () => {
  const [balance, setBalance] = useState(createEmptyUserBalanceEntity());

  const storeSettings = useStoreSettingsSelector();
  const storeBalanceLoader = useStoreUIBalanceLoader();
  const dispatch = useDispatch();

  const showLoader = () => {
    dispatch(showBalanceLoader(true));
    loadData();
  };

  useEffect(showLoader, [storeSettings.selectedExchange.internalId]);

  const loadData = () => {
    if (storeSettings.selectedExchange.internalId) {
      const payload = {
        exchangeInternalId: storeSettings.selectedExchange.internalId,
      };

      tradeApi
        .userBalanceGet(payload)
        .then((data) => {
          setBalance(data);
          if (storeBalanceLoader) {
            dispatch(showBalanceLoader(false));
          }
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        });
    }
  };

  useInterval(loadData, 5000, true);

  return balance;
};

export default useUpdatedBalance;
