import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";
import { Button } from "react-native-paper";

export const MainContainer = styled.ScrollView`
  background-color: ${theme.colors.bg.third};
  flex: 1;
`;

export const IndexContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  display: flex;
  gap: 10px;
`

export const BoxIndexContainer = styled.View`
  background-color: ${theme.colors.bg.primary};
  width: 170px;
  height: 170px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: ${theme.fontWeights.bold};
  font-family: ${theme.fonts.body_bold};
`

export const BodyText = styled(Text)`
  font-size: 14px;
`

export const InformationContainer = styled.View`
  background-color: ${theme.colors.color.white};
  border-radius: 30px;
  margin-top: 34px;
  padding: 18px;
`

export const DescripContainer = styled.View`
  background-color: ${theme.colors.color.white};
  flex: 1;
  border-radius: 40px 40px 0px 0px;
  padding: 20px;
  margin-top: 14px;
`;