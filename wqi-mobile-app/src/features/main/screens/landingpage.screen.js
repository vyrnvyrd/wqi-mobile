import {
  MainContainer,
  Title,
  ImgLanding,
  SubTitle,
  NextButton
} from "../components/landingpage.styles";
import { useDispatch } from 'react-redux';

export const LandingPageScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <MainContainer>
      <ImgLanding
        source={require('../../../../assets/splash.png')}
      />
      <Title>WQI</Title>
      <SubTitle>Know your water quality</SubTitle>
      <NextButton
        onPress={() => { dispatch({ type: "CONTINUE_SCREEN", payload: true }) }}
      >Start</NextButton>
    </MainContainer>
  )
}