import SelectDropdown from 'react-native-select-dropdown'
import { DroidSafeArea } from "../../../utils/global"
import {
  MainContainer,
  ContainerSearch,
  TitlePage,
  LabelStyle,
  ContainerTitlePage,
  ContainerField,
  SelectButton,
  ContainerSelectButton
} from "../components/searchpage.styles"

const SafeArea = DroidSafeArea;

export const SearchPageScreen = ({ navigation }) => {
  const optionsKota = [
    {
      value: '3273',
      label: 'KOTA BANDUNG'
    }
  ]

  return (
    <SafeArea>
      <MainContainer>
        <TitlePage style={{ color: 'black' }}>Pencarian Sumur</TitlePage>
        <ContainerTitlePage />
        <ContainerSearch>
          <ContainerField>
            <LabelStyle>Kota/Kabupaten</LabelStyle>
            <SelectDropdown
              data={optionsKota}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kota'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              defaultValueByIndex={0}
              disabled
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Kecamatan</LabelStyle>
            <SelectDropdown
              data={optionsKota}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kota'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              defaultValueByIndex={0}
              disabled
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Kelurahan</LabelStyle>
            <SelectDropdown
              data={optionsKota}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kota'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              defaultValueByIndex={0}
              disabled
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Cari Sumur</LabelStyle>
            <SelectDropdown
              data={optionsKota}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kota'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              defaultValueByIndex={0}
              disabled
            />
          </ContainerField>
          <ContainerSelectButton>
            <SelectButton
              onPress={() => { }}
            >Pilih Sumur</SelectButton>
          </ContainerSelectButton>
        </ContainerSearch>
      </MainContainer>
    </SafeArea>
  )
}