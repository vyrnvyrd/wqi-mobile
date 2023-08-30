import { Text } from "../../../components/typography/text.component"
import { MainContainer } from "../components/searchpage.styles"
import { DroidSafeArea } from "../../../utils/global"

const SafeArea = DroidSafeArea;

export const SearchPageScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <MainContainer>
        <Text>Halo</Text>
      </MainContainer>
    </SafeArea>
  )
}