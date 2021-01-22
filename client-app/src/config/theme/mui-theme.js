import { createMuiTheme } from "@material-ui/core";

const primaryColor = "#5F63F2";
const primaryHover = "#4347D9";
const secondaryColor = "#FF69A5";
const secondaryHover = "#E34A87";
const linkColor = "#1890ff";
const linkHover = "#0D79DF";
const headingColor = "rgba(0, 0, 0, 0.85)";
const successColor = "#20C997";
const successHover = "#0CAB7C";
const warningColor = "#FA8B0C";
const warningHover = "#D47407";
const errorColor = "#f5222d";
const errorHover = "#E30D0F";
const infoColor = "#2C99FF";
const infoHover = "#0D79DF";
const darkColor = "#272B41";
const darkHover = "#131623";
const grayColor = "#5A5F7D";
const grayHover = "#363A51";
const lightColor = "#9299B8";
const lightHover = "#e2e6ea";
const whiteColor = "#ffffff";
const dashColor = "#E3E6EF";
const whiteHover = "#5A5F7D";
const extraLightColor = "#ADB4D2";
const dangerColor = "#FF4D4F";
const dangerHover = "#E30D0F";
const borderColorLight = "#F1F2F6";
const borderColorNormal = "#E3E6EF";
const borderColorDeep = "#C6D0DC";
const bgGrayColorDeep = "#EFF0F3";
const bgGrayColorLight = "#F8F9FB";
const bgGrayColorNormal = "#F4F5F7";
const lightGrayColor = "#868EAE";
const sliderRailColor = "rgba(95,99,242,0.2)";
const graySolid = "#9299b8";
const pinkColor = "#F63178";
const btnlg = "48px";
const btnsm = "36px";
const btnxs = "29px";

/*
 * Reference
 * https://github.com/mui-org/material-ui/blob/master/src/styles/getMuiTheme.js
 */

export default createMuiTheme({
  appBar: {
    height: 75,
    color: primaryColor,
    textColor: darkColor,
  },
  tabs: {
    backgroundColor: "ffffff",
    textColor: darkColor,
    selectedTextColor: lightHover,
  },
  raisedButton: {
    textColor: "ffffff",
    primaryColor: primaryColor,
    secondaryColor,
  },
  flatButton: {
    textColor: "ffffff",
    primaryColor,
    secondaryColor,
  },
  floatingActionButton: {
    textColor: "ffffff",
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
  },
});
