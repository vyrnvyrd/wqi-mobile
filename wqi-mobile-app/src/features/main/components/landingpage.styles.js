import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Image } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { Button } from "react-native-paper";

export const MainContainer = styled.View`
  background-color: ${theme.colors.bg.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.h2};
  font-weight: ${theme.fontWeights.bold};
  font-family: ${theme.fonts.body_bold}
`

export const SubTitle = styled(Text)`
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.body};
`

export const ImgLanding = styled(Image)`
`

export const NextButton = styled(Button).attrs({
  textColor: 'white',
  labelStyle: {
    fontSize: 20,
    fontFamily: theme.fonts.body_bold
  }
})`
  margin-top: 152px;
  width: 271px;
  color: white !important;
  height: 50px;
  background-color: ${theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  font-size: 50px;
`;