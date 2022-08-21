const conditionalTokenApiURL =
  "https://conditional-token-backend.herokuapp.com";

 // const addresss = '0xEa2ff902dbeEECcc828757B881b343F9316752e5';	
const addresss = '0xb0af2f3733E807de9C05A65f79E8532C8E1722e0';

// const conditionalTokenApiURL = "http://localhost:8089";
const metamaskInstallURL =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

const colors = {
  white: "#FFFFFF",
  primaryDark: "#0A1929",
  secondaryDark: "#082038",
  primaryLight: "#007FFF",
};

const weiToEthereum = (value) => value /  10 ** 18;

export { conditionalTokenApiURL, metamaskInstallURL, colors , addresss, weiToEthereum};
