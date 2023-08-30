import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";
import { Button } from "react-native-paper";

export const MainContainer = styled.View`
  background-color: ${theme.colors.bg.third};
  flex: 1;
`;

export const TitlePage = styled(Text)`
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.h5};
  font-weight: ${theme.fontWeights.bold};
  font-family: ${theme.fonts.body_bold};
  margin-top: 46px;
  padding-left: 19px;
`;

export const ContainerTitlePage = styled.View`
  border-top-color: ${theme.colors.bg.secondary};
  border-top-width: 5px;
  margin-left: 34px; 
  margin-right: 106px;
`

export const ContainerSearch = styled.View`
  background-color: ${theme.colors.color.white};
  flex: 1;
  margin-top: 49px;
  width: 100%;
  border-radius: 50px 50px 0px 0px;
  padding-top: 41px;
  padding-left: 19px;
  padding-right: 19px;
`;

export const LabelStyle = styled(Text)`
  color: ${theme.colors.bg.four};
  font-weight: ${theme.fontWeights.bold};
  font-family: ${theme.fonts.body_bold};
  font-size: 18px;
`

export const ContainerField = styled.View`
  margin-bottom: 20px;
`

export const ContainerSelectButton = styled.View`
  flex: 1;
  width: 100%;
`

export const SelectButton = styled(Button).attrs({
  textColor: 'white',
  labelStyle: {
    fontSize: 20,
    fontFamily: theme.fonts.body_bold
  }
})`
  width: 271px;
  color: white !important;
  height: 50px;
  background-color: ${theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  font-size: 50px;
  margin: auto;
`;