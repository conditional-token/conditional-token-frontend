const conditionalTokenApiURL =
  "https://conditional-token-backend.herokuapp.com";

const metamaskInstallURL =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

const colors = {
  white: "#FFFFFF",
  primaryDark: "#0A1929",
  secondaryDark: "#082038",
  primaryLight: "#007FFF",
};

const weiToEthereum = (value) => value / 10 ** 18;

const ropstenParams = {
  chainId: `0x${(3).toString(16)}`,
  chainName: "Ropsten",
  nativeCurrency: {
    name: "Ropsten Ether",
    symbol: "ROP",
    decimals: 18,
  },
  rpcUrls: ["https://ropsten.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2"],
  blockExplorerUrls: ["https://ropsten.etherscan.io/"],
};

export {
  conditionalTokenApiURL,
  metamaskInstallURL,
  colors,
  weiToEthereum,
  ropstenParams,
};
