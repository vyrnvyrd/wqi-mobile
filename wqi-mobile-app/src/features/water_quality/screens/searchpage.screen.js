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
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';


const SafeArea = DroidSafeArea;

export const SearchPageScreen = ({ navigation }) => {
  const [optionsKecamatan, setOptionsKecamatan] = useState([]);
  const [optionKelurahan, setOptionsKelurahan] = useState([]);
  const [optionSumur, setOptionsSumur] = useState([]);
  const [form, setForm] = useState(
    {
      id_kota: '3273',
      id_kecamatan: '',
      id_kelurahan: '',
      id_sumur: '',
    }
  )
  const optionsKota = [
    {
      value: '3273',
      label: 'KOTA BANDUNG'
    }
  ]

  const getKecamatan = async () => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/3273.json`)
      .then(response => response.json())
      .then(districts => {
        setOptionsKecamatan([...districts.map(el => ({ value: el?.id, label: el?.name }))])
      });
  }

  const getKelurahan = async (id) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`)
      .then(response => response.json())
      .then(villages => {
        setOptionsKelurahan([...villages.map(el => ({ value: el?.id, label: el?.name }))])
      });
  }

  const getInfo = () => {
    if (form.id_kecamatan === '' || form.id_kelurahan === '' || form.id_sumur === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Semua field wajib diisi!'
      });
      return
    }
  }

  useEffect(() => {
    getKecamatan();
  }, [])

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
              data={optionsKecamatan}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kecamatan'
              onSelect={(selectedItem) => {
                getKelurahan(selectedItem.value)
                setForm({
                  ...form,
                  id_kecamatan: selectedItem.value
                })
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Kelurahan</LabelStyle>
            <SelectDropdown
              data={optionKelurahan}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Kelurahan'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              disabled={form.id_kecamatan === ''}
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Cari Sumur</LabelStyle>
            <SelectDropdown
              data={optionSumur}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Pilih Sumur'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
            />
          </ContainerField>
          <ContainerSelectButton>
            <SelectButton
              onPress={getInfo}
            >Lihat Info</SelectButton>
          </ContainerSelectButton>
        </ContainerSearch>
      </MainContainer>
    </SafeArea>
  )
}