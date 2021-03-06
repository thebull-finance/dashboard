import { useState, useEffect } from "react";
import tradeApi from "../services/tradeApiClient";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../store/actions/ui";

/**
 * @typedef {import("services/tradeApiClient.types").ExchangeConnectionEntity} ExchangeConnectionEntity
 * @typedef {Object} HookData
 * @property {*} balance
 * @property {Boolean} loading
 */

/**
 * Provides balance summary for exchange.
 * @param {ExchangeConnectionEntity} selectedExchange Exchange account object.
 * @param {boolean} [shouldExecute] Flag to indicate if we should execute the request, demo accounts are bypassed.
 * @returns {HookData} Balance.
 */
const useAvailableBalance = (selectedExchange, shouldExecute = true) => {
  const [balance, setBalance] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loadData = () => {
    // Skip balance fetch for paper trading exchanges.
    if (selectedExchange.internalId && !selectedExchange.paperTrading && shouldExecute) {
      setLoading(true);

      tradeApi
        .userAvailableBalanceGet(selectedExchange.internalId)
        .then((data) => {
          setBalance(data);
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(loadData, [selectedExchange.internalId]);

  return { balance, loading };
};

export default useAvailableBalance;
