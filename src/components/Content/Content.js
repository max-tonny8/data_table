import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Web3 from "web3";
import eth_ABI from "../ABIs/eth_ABI.json";
import poly_abI_1 from "../ABIs/poly_ABI_1.json";

const ether_token_scan = "https://etherscan.io/token/";
const ether_address_scan = "https://etherscan.io/address/";
const polygon_token_scan = "https://polygonscan.com/token/";
const polygon_address_scan = "https://polygonscan.com/address/";
const fliTokenDetails = [
  {
    product: "icETH",
    token_address: "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84",
    keeper_address: "0xd17b4f16c7019eeE03D3fbCf709268998eD54d55",
    manage_address: "0xb97f5a34696adf30db822612379235c3c53b714a",
    strategy_extension_address: ["0xe6484a64e2ea165943c734dC498070b5902CBc2b"],
    is_ethereum: true
  },
  {
    product: "ETH2x-FLI",
    token_address: "0xaa6e8127831c9de45ae56bb1b0d4d4da6e5665bd",
    keeper_address: "0xEa80829C827f1633A46E7EA6026Ed693cA54eebD",
    manage_address: "0x0749CE17c983Deb806D6b841c65b7359C3d5b104 ",
    strategy_extension_address: ["0x9bA41A2C5175d502eA52Ff9A666f8a4fc00C00A1", "0xe833C90F4d07650aC1d8a915C2c0fdDBEDC1ec3A"],
  },
  {
    product: "BTC2x-FLI",
    token_address: "0x0b498ff89709d3838a063f1dfa463091f9801c2b",
    keeper_address: "0xCBEb906f46eA0b9D7e7e75379fAFbceACd1aAeff",
    manage_address: "0x3b439351177fC9d7b5fd11aEdCc177D73F989341 ",
    strategy_extension_address: ["0xFD4eA597E8346a6723FA4A06a31E4b6F7F37e9Ad", "0x5e568E47C52E8af9dB47e52D0Ae7c740f8f85BF1"],
  },
  {
    product: "BTC2x-FLI-P",
    token_address: "0xd6ca869a4ec9ed2c7e618062cdc45306d8dbbc14",
    keeper_address: "0xB0d01F7e741C7F708386bE1438A70eDBA9B29a86",
    manage_address: "0x76fe46c9fe6317f73e7fef31346473652eebf3fa",
    strategy_extension_address: [
      "0x3885f88a5bb0791169e80ec5821174976aad7f0a",
      "0xd2463675a099101e36d85278494268261a66603a",
    ],
  },
  {
    product: "iETH-FLI-P",
    token_address: "0x4f025829c4b13df652f38abd2ab901185ff1e609",
    keeper_address: "0x12e5B4877D2Be78B87DA64BCB2309D076AF3Bd41",
    manage_address: "0xc4a1bfbce706dc638268085335cef2398ecec23c",
    strategy_extension_address: ["0x70E86d6b6a99a573F3Db765D1DBdf9e35ef5EBa9", "0xb994cfcd23047393530883ac8a004bd30c8a5164"],
  },
  {
    product: "iMATIC-FLI-P",
    token_address: "0x340f412860da7b7823df372a2b59ff78b7ae6abc",
    keeper_address: "0x998155DcB668eAB8801c3E4230078Bf96499502d",
    manage_address: "0x9c4218b515d39d20b7e1b6074418aef4c0eaef71",
    strategy_extension_address: ["0xE7cA688c8ac7f7225aA0FF0169115F6b5827B045", "0x5e38f84BFDee7058C311C80FB79229d301efe121"],
  },
  {
    product: "iBTC-FLI-P",
    token_address: "0x130ce4e4f76c2265f94a961d70618562de0bb8d2",
    keeper_address: "0x9aaC61a4a3d9c8EbA7d96Bd47b6Ed36965a5B304",
    manage_address: "0xf41acb71f9af89546c133944141b400168fe2da1",
    strategy_extension_address: ["0x3BD4ca36a513dA012Fa77BC471E35F844425a0af", "0x460EF681713448C50392824317fC2D883b722812"],
  },
  {
    product: "ETH2x-FLI-P",
    token_address: "0x3ad707da309f3845cd602059901e39c4dcd66473",
    keeper_address: "0x9Edf6539124ce7E82767a695eCB313B5a584c14A",
    manage_address: "0x2622c4BB67992356B3826b5034bB2C7e949ab12B",
    strategy_extension_address: ["0xb97F5a34696adf30db822612379235c3c53B714A", "0xe6484a64e2ea165943c734dC498070b5902CBc2b"],
  },
  {
    product: "MATIC2x-FLI-P",
    token_address: "0xf287d97b6345bad3d88856b26fb7c0ab3f2c7976",
    keeper_address: "0x00C68B75e1A8ddF7680e694b0E441FD62C87Cba2",
    manage_address: "0x0bd75d6efe664991cab603d140375b2f4f70dd70",
    strategy_extension_address: ["0x31459836b4F19c84eC004b92aef6b00f7490da52", "0xEa381e5b73cd416e577a36a498b3Fa78DD21dF5F"],
  },

];

export default function Content() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    { title: "Product", field: "product" },
    { title: "Token Address", field: "token_address", render: rowData => 
      <a href={rowData.token_address_link}>{rowData.token_address}</a> 
    },
    { title: "Chain", field: "chain" },
    { title: "Keeper Wallet", field: "keeper_wallet", render: rowData => <a href={rowData.keeper_wallet_link}>{rowData.keeper_wallet}</a> },
    { title: "Wallet Balance", field: "wallet_balance" },
    { title: "Manager address", field: "manage_address", render: rowData => <a href={rowData.manage_address_link}>{rowData.manage_address}</a> },
    {
      title: "FlexibleLeverageStrategyExtension address",
      field: "strategy_extension_address",
      render: rowData => <a href={rowData.strategy_extension_address_link}>{rowData.strategy_extension_address}</a> 
    },
    { title: "Current Leverage Ratio", field: "current_leverage_ratio" },
    { title: "Target Leverage", field: "target_leverage_ratio" },
    { title: "Min Leverage", field: "min_leverage_ratio" },
    { title: "Max Leverage", field: "max_leverage_ratio" },
  ])
  useEffect(() => {
    const web3Eth = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    );

    const web3Polygon = new Web3(
      new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
    );

    let result = [];
    let index = 0;
    fliTokenDetails.map(async (item) => {
      if (item.product === "icETH") {
        const bal = await web3Eth.eth.getBalance(item.keeper_address);
        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const eth_instance = new web3Eth.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await eth_instance.methods
            .getCurrentLeverageRatio()
            .call();

            const leverage_data = await eth_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              token_address_link: ether_token_scan + item.token_address,
              keeper_wallet_link: ether_address_scan + item.keeper_address,
              manage_address_link: ether_address_scan + item.manage_address,
              strategy_extension_address_link: ether_address_scan + extension_address,
              chain: "Mainnet",
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " ETH",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });

            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {
            
          }
        });

      } 
      if (item.product === "ETH2x-FLI") {
        const bal = await web3Eth.eth.getBalance(item.keeper_address);
        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const eth_instance = new web3Eth.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await eth_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await eth_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Mainnet",
              token_address_link: ether_token_scan + item.token_address,
              keeper_wallet_link: ether_address_scan + item.keeper_address,
              manage_address_link: ether_address_scan + item.manage_address,
              strategy_extension_address_link: ether_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " ETH",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });

            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {
            
          }
        });

      } 
      if (item.product === "BTC2x-FLI") {
        const bal = await web3Eth.eth.getBalance(item.keeper_address);
        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const eth_instance = new web3Eth.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await eth_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await eth_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Mainnet",
              keeper_wallet: item.keeper_address,
              token_address_link: ether_token_scan + item.token_address,
              keeper_wallet_link: ether_address_scan + item.keeper_address,
              manage_address_link: ether_address_scan + item.manage_address,
              strategy_extension_address_link: ether_address_scan + extension_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " ETH",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });

            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {
            
          }
        });

      } 
      if (item.product === "BTC2x-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              poly_abI_1,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Polygon",
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
      }
      if (item.product === "iETH-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Polygon",
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
        
      }
      if (item.product === "iMATIC-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Polygon",
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
        
      }
      if (item.product === "iBTC-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Polygon",
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
        
      }
      if (item.product === "ETH2x-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              token_address: item.token_address,
              chain: "Polygon",
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
        
      }
      if (item.product === "MATIC2x-FLI-P") {
        const bal = await web3Polygon.eth.getBalance(item.keeper_address);

        item.strategy_extension_address.map(async (extension_address) => {
          try {
            const pol_instance = new web3Polygon.eth.Contract(
              eth_ABI,
              extension_address
            );
            const leverage_ratio = await pol_instance.methods
            .getCurrentLeverageRatio()
            .call();
            const leverage_data = await pol_instance.methods
              .getMethodology()
              .call();
            result.push({
              product: item.product,
              token_address: item.token_address,
              chain: "Polygon",
              token_address_link: polygon_token_scan + item.token_address,
              keeper_wallet_link: polygon_address_scan + item.keeper_address,
              manage_address_link: polygon_address_scan + item.manage_address,
              strategy_extension_address_link: polygon_address_scan + extension_address,
              keeper_wallet: item.keeper_address,
              wallet_balance: (bal / 10 ** 18).toFixed(4) + " MATIC",
              manage_address: item.manage_address,
              strategy_extension_address: extension_address,
              current_leverage_ratio:
              (leverage_ratio / 10 ** 18).toFixed(4) + "x",
              target_leverage_ratio:
                leverage_data.targetLeverageRatio / 10 ** 18 + "x",
              min_leverage_ratio:
                leverage_data.minLeverageRatio / 10 ** 18 + "x",
              max_leverage_ratio:
                leverage_data.maxLeverageRatio / 10 ** 18 + "x",
            });
            index++;
            if (index === fliTokenDetails.length) {
              setData(result);
            }
          } catch (e) {}
        });
        
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
        columns={columns}
        data={data}
        title="Users Data"
        options={{ pageSize: 15 }}
      />
    </div>
  );
}
