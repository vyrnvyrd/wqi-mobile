import styled from "styled-components/native";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const MainContainer = styled.View`
  background-color: ${colors.bg.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: ${colors.text.primary};
  font-size: 50px;
`