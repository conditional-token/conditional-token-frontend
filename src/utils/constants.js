const conditionalTokenApiURL = "https://conditional-token-backend.herokuapp.com";

const metamaskInstallURL =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";

const colors = {
  white: "#FFFFFF",
  primaryDark: "#0A1929",
  secondaryDark: "#082038",
  primaryLight: "#007FFF",
};

const weiToEthereum = (value) => value /  10 ** 18;

export { conditionalTokenApiURL, metamaskInstallURL, colors ,  weiToEthereum};
