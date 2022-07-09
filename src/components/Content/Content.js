import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Web3 from "web3";

const fliTokenDetails = [
  {
    product: "ETH2x-FLI",
    token_address: "0x9bA41A2C5175d502eA52Ff9A666f8a4fc00C00A1",
    keeper_address: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD",
    main_contract: "0x9ba41a2c5175d502ea52ff9a666f8a4fc00c00a1",
  },
  {
    product: "ETH2x-FLI",
    token_address: "0x9bA41A2C5175d502eA52Ff9A666f8a4fc00C00A1",
    keeper_address: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD",
    main_contract: "0x9ba41a2c5175d502ea52ff9a666f8a4fc00c00a1",
  }
];
const mainABI = [
  {
    inputs: [
      {
        internalType: "contract IBaseManager",
        name: "_manager",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract ISetToken",
            name: "setToken",
            type: "address",
          },
          {
            internalType: "contract ILeverageModule",
            name: "leverageModule",
            type: "address",
          },
          {
            internalType: "contract IComptroller",
            name: "comptroller",
            type: "address",
          },
          {
            internalType: "contract IChainlinkAggregatorV3",
            name: "collateralPriceOracle",
            type: "address",
          },
          {
            internalType: "contract IChainlinkAggregatorV3",
            name: "borrowPriceOracle",
            type: "address",
          },
          {
            internalType: "contract ICErc20",
            name: "targetCollateralCToken",
            type: "address",
          },
          {
            internalType: "contract ICErc20",
            name: "targetBorrowCToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralAsset",
            type: "address",
          },
          { internalType: "address", name: "borrowAsset", type: "address" },
          {
            internalType: "uint256",
            name: "collateralDecimalAdjustment",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowDecimalAdjustment",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ContractSettings",
        name: "_strategy",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "targetLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "recenteringSpeed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rebalanceInterval",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.MethodologySettings",
        name: "_methodology",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "unutilizedLeveragePercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "twapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExecutionSettings",
        name: "_execution",
        type: "tuple",
      },
      {
        components: [
          { internalType: "uint256", name: "etherReward", type: "uint256" },
          {
            internalType: "uint256",
            name: "incentivizedLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedSlippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.IncentiveSettings",
        name: "_incentive",
        type: "tuple",
      },
      { internalType: "string[]", name: "_exchangeNames", type: "string[]" },
      {
        components: [
          {
            internalType: "uint256",
            name: "twapMaxTradeSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "exchangeLastTradeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapMaxTradeSize",
            type: "uint256",
          },
          { internalType: "bytes", name: "leverExchangeData", type: "bytes" },
          {
            internalType: "bytes",
            name: "deleverExchangeData",
            type: "bytes",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExchangeSettings[]",
        name: "_exchangeSettings",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bool", name: "_status", type: "bool" },
    ],
    name: "AnyoneCallableUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_caller",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "_status", type: "bool" },
    ],
    name: "CallerStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_chunkRebalanceNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalRebalanceNotional",
        type: "uint256",
      },
    ],
    name: "Disengaged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_chunkRebalanceNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalRebalanceNotional",
        type: "uint256",
      },
    ],
    name: "Engaged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_exchangeName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "twapMaxTradeSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangeLastTradeTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "incentivizedTwapMaxTradeSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "leverExchangeData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "deleverExchangeData",
        type: "bytes",
      },
    ],
    name: "ExchangeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_exchangeName",
        type: "string",
      },
    ],
    name: "ExchangeRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_exchangeName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "twapMaxTradeSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "exchangeLastTradeTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "incentivizedTwapMaxTradeSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "leverExchangeData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "deleverExchangeData",
        type: "bytes",
      },
    ],
    name: "ExchangeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_unutilizedLeveragePercentage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_twapCooldownPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_slippageTolerance",
        type: "uint256",
      },
    ],
    name: "ExecutionSettingsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_etherReward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_incentivizedLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_incentivizedSlippageTolerance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_incentivizedTwapCooldownPeriod",
        type: "uint256",
      },
    ],
    name: "IncentiveSettingsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_targetLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_minLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_maxLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_recenteringSpeed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_rebalanceInterval",
        type: "uint256",
      },
    ],
    name: "MethodologySettingsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_chunkRebalanceNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalRebalanceNotional",
        type: "uint256",
      },
    ],
    name: "RebalanceIterated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_chunkRebalanceNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalRebalanceNotional",
        type: "uint256",
      },
    ],
    name: "Rebalanced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newLeverageRatio",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_rebalanceNotional",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_etherIncentive",
        type: "uint256",
      },
    ],
    name: "RipcordCalled",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
      {
        components: [
          {
            internalType: "uint256",
            name: "twapMaxTradeSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "exchangeLastTradeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapMaxTradeSize",
            type: "uint256",
          },
          { internalType: "bytes", name: "leverExchangeData", type: "bytes" },
          {
            internalType: "bytes",
            name: "deleverExchangeData",
            type: "bytes",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExchangeSettings",
        name: "_exchangeSettings",
        type: "tuple",
      },
    ],
    name: "addEnabledExchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "anyoneCallable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "callAllowList",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "disengage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "enabledExchanges",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "engage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string[]", name: "_exchangeNames", type: "string[]" },
    ],
    name: "getChunkRebalanceNotional",
    outputs: [
      { internalType: "uint256[]", name: "sizes", type: "uint256[]" },
      { internalType: "address", name: "sellAsset", type: "address" },
      { internalType: "address", name: "buyAsset", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentEtherIncentive",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentLeverageRatio",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEnabledExchanges",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "getExchangeSettings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "twapMaxTradeSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "exchangeLastTradeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapMaxTradeSize",
            type: "uint256",
          },
          { internalType: "bytes", name: "leverExchangeData", type: "bytes" },
          {
            internalType: "bytes",
            name: "deleverExchangeData",
            type: "bytes",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExchangeSettings",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExecution",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "unutilizedLeveragePercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "twapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExecutionSettings",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIncentive",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "etherReward", type: "uint256" },
          {
            internalType: "uint256",
            name: "incentivizedLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedSlippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.IncentiveSettings",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMethodology",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "targetLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "recenteringSpeed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rebalanceInterval",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.MethodologySettings",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStrategy",
    outputs: [
      {
        components: [
          {
            internalType: "contract ISetToken",
            name: "setToken",
            type: "address",
          },
          {
            internalType: "contract ILeverageModule",
            name: "leverageModule",
            type: "address",
          },
          {
            internalType: "contract IComptroller",
            name: "comptroller",
            type: "address",
          },
          {
            internalType: "contract IChainlinkAggregatorV3",
            name: "collateralPriceOracle",
            type: "address",
          },
          {
            internalType: "contract IChainlinkAggregatorV3",
            name: "borrowPriceOracle",
            type: "address",
          },
          {
            internalType: "contract ICErc20",
            name: "targetCollateralCToken",
            type: "address",
          },
          {
            internalType: "contract ICErc20",
            name: "targetBorrowCToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "collateralAsset",
            type: "address",
          },
          { internalType: "address", name: "borrowAsset", type: "address" },
          {
            internalType: "uint256",
            name: "collateralDecimalAdjustment",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "borrowDecimalAdjustment",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ContractSettings",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalLastTradeTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "iterateRebalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [
      { internalType: "contract IBaseManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "rebalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "removeEnabledExchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
    ],
    name: "ripcord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "unutilizedLeveragePercentage",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "slippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "twapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExecutionSettings",
        name: "_newExecutionSettings",
        type: "tuple",
      },
    ],
    name: "setExecutionSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "etherReward", type: "uint256" },
          {
            internalType: "uint256",
            name: "incentivizedLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedSlippageTolerance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapCooldownPeriod",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.IncentiveSettings",
        name: "_newIncentiveSettings",
        type: "tuple",
      },
    ],
    name: "setIncentiveSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "targetLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxLeverageRatio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "recenteringSpeed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rebalanceInterval",
            type: "uint256",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.MethodologySettings",
        name: "_newMethodologySettings",
        type: "tuple",
      },
    ],
    name: "setMethodologySettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "shouldRebalance",
    outputs: [
      { internalType: "string[]", name: "", type: "string[]" },
      {
        internalType:
          "enum FlexibleLeverageStrategyExtension.ShouldRebalance[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_customMinLeverageRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_customMaxLeverageRatio",
        type: "uint256",
      },
    ],
    name: "shouldRebalanceWithBounds",
    outputs: [
      { internalType: "string[]", name: "", type: "string[]" },
      {
        internalType:
          "enum FlexibleLeverageStrategyExtension.ShouldRebalance[]",
        name: "",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "twapLeverageRatio",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_status", type: "bool" }],
    name: "updateAnyoneCallable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_callers", type: "address[]" },
      { internalType: "bool[]", name: "_statuses", type: "bool[]" },
    ],
    name: "updateCallerStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_exchangeName", type: "string" },
      {
        components: [
          {
            internalType: "uint256",
            name: "twapMaxTradeSize",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "exchangeLastTradeTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "incentivizedTwapMaxTradeSize",
            type: "uint256",
          },
          { internalType: "bytes", name: "leverExchangeData", type: "bytes" },
          {
            internalType: "bytes",
            name: "deleverExchangeData",
            type: "bytes",
          },
        ],
        internalType:
          "struct FlexibleLeverageStrategyExtension.ExchangeSettings",
        name: "_exchangeSettings",
        type: "tuple",
      },
    ],
    name: "updateEnabledExchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawEtherBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export default function Content() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const web3Eth = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    );

    let result = [];
    fliTokenDetails.map(async (item, index) => {
      if (item.product === "ETH2x-FLI") {
        const mainObj = new web3Eth.eth.Contract(mainABI, item.main_contract);

        const leverages = await mainObj.methods.getMethodology().call();
        const bal = await web3Eth.eth.getBalance(item.keeper_address);
        result.push({
          product: item.product,
          token_address: item.token_address,
          chain: "Mainnet",
          keeper_wallet: item.keeper_address,
          wallet_balance: (bal / 10**18).toFixed(4) + " ETH",
          current_leverage_ratio: leverages.recenteringSpeed / 10**18 + "x",
          target_leverage_ratio: leverages.targetLeverageRatio / 10**18+"x",
          min_leverage_ratio: leverages.minLeverageRatio / 10**18 +"x",
          max_leverage_ratio: leverages.maxLeverageRatio / 10**18 + "x",
        });
      }

      if(index === fliTokenDetails.length - 1) {
        setData(result)
      }
    });
  }, []);


  // { title: "Product", field: "product", headerStyle: {
  //   maxWidth: 100, // <--- ADD THIS AND IT WILL WORK
  //   overflow: "hidden",
  //   paddingLeft: '24px',
  //   paddingRight: '24px'
  // } },
  return (
    <div className="leverage-table">
      <MaterialTable
        columns={[
          { title: "Product", field: "product" },
          { title: "Token Address", field: "token_address" },
          { title: "Chain", field: "chain" },
          { title: "Keeper Wallet", field: "keeper_wallet" },
          { title: "Wallet Balance", field: "wallet_balance" },
          { title: "Current Leverage Ratio", field: "current_leverage_ratio" },
          { title: "Target Leverage", field: "target_leverage_ratio" },
          { title: "Min Leverage", field: "min_leverage_ratio" },
          { title: "Max Leverage", field: "max_leverage_ratio" },
        ]}
        data={data}
        title="Users Data"
        options={{pageSize: 15}}
          // rowStyle: '4px 15px 4px 9px'
      />
    </div>
  );
}
