const conditionalTokenApiURL =
  "https://conditional-token-backend.herokuapp.com";

 // const addresss = '0xEa2ff902dbeEECcc828757B881b343F9316752e5';	
const addresss = '0x6E2A4BDA853cBa7a7198A63b2be9a9ab654B503D';

// const conditionalTokenApiURL = "http://localhost:8089";
const metamaskInstallURL =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

const colors = {
  white: "#FFFFFF",
  primaryDark: "#0D1117",
  secondaryDark: "#161B22",
  primaryLight: "#BABBBD",
};

const weiToEthereum = (value) => value /  10 ** 18;

export { conditionalTokenApiURL, metamaskInstallURL, colors , addresss, weiToEthereum};
