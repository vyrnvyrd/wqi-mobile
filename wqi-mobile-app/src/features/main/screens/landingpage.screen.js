import {
  MainContainer,
  Title,
  ImgLanding,
  SubTitle,
  NextButton
} from "../components/landingpage.styles";
import { useSelector, useDispatch } from 'react-redux';
import { continueScreen } from '../../../redux/actions/continueDataAction';

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
      >Mulai</NextButton>
    </MainContainer>
  )
}