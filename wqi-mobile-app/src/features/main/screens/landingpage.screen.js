import {
  MainContainer,
  Title,
  ImgLanding,
  SubTitle,
  NextButton
} from "../components/landingpage.styles";

export const LandingPageScreen = ({ navigation }) => {
  return (
    <MainContainer>
      <ImgLanding
        source={require('../../../../assets/splash.png')}
      />
      <Title>WQI</Title>
      <SubTitle>Know your water quality</SubTitle>
      <NextButton
        onPress={() => navigation.navigate('Search')}
      >Mulai</NextButton>
    </MainContainer>
  )
}