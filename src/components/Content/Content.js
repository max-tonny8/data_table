import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function Content() {
  const [data, setData] = useState([
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    { product: "ETH2x-FLI", token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd", chain: "Mainnet", keeper_wallet: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD", wallet_balance: "2.579 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '0.98x', min_leverage_ratio: '1.5x', max_leverage_ratio: '0.5x' },
    { product: "BTC2x-FLI", token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", chain: "Mainnet", keeper_wallet: "0x0b498ff89709d3838a063f1dfa463091f9801c2b", wallet_balance: "1.846 ETH", current_leverage_ratio: "1.98x", target_leverage_ratio: '2.0x', min_leverage_ratio: '1.98x', max_leverage_ratio: '0.48x' },
    
  ]);

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/b/5cac473385438b0272f29964")
      .then(res => res.data)
      .then(res => setData(res));
  }, []);

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
          { title: "Max Leverage", field: "max_leverage_ratio" }
        ]}
        data={data}
        title="Users Data"
        options={{ pageSize: '15'  }}
      />
    </div>
  );
}
