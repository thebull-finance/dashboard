import { useState, useEffect } from "react";
import tradeApi from "../services/tradeApiClient";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../store/actions/ui";

/**
 * @typedef {import("../services/tradeApiClient.types").ExchangeAssetsDict} ExchangeAssetsDict
 */

/**
 * Provides balance summary for exchange.
 *
 * @param {string} internalId ID of the exchange.
 * @param {Date} [updatedAt] Last updated date to force data refresh.
 * @returns {ExchangeAssetsDict} Balance.
 */
const useUserExchangeAssets = (internalId, updatedAt) => {
  const [assets, setAssets] = useState(null);
  const dispatch = useDispatch();

  const loadData = () => {
    if (internalId) {
      const payload = {
        internalId: internalId,
      };

      tradeApi
        .exchangeAssetsGet(payload)
        .then((response) => {
          setAssets(response);
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        });
    }
  };

  useEffect(loadData, [internalId, updatedAt]);

  return assets;
};

export default useUserExchangeAssets;
