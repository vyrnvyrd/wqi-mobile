import SelectDropdown from 'react-native-select-dropdown'
import Toast from 'react-native-toast-message';
import { DroidSafeArea } from "../../../utils/global"
import { useEffect, useRef, useState } from 'react';
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
  const [optionsKecamatan, setOptionsKecamatan] = useState([]);
  const [optionKelurahan, setOptionsKelurahan] = useState([]);
  const [optionSumur, setOptionsSumur] = useState([]);
  const refKecamatan = useRef({});
  const refKelurahan = useRef({});
  const refSumur = useRef({});
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
      label: 'BANDUNG'
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

  const getSumur = async (id_kelurahan) => {
    const url = `http://localhost:8000/water_quality/cari-sumur?id_kota=${form.id_kota}&id_kecamatan=${form.id_kecamatan}&id_kelurahan=${id_kelurahan}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setOptionsSumur([...data.map(el => ({ value: el?.id, label: el?.nama_sumur }))])
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
    refKecamatan.current.reset()
    refKelurahan.current.reset()
    refSumur.current.reset()
    navigation.navigate('Detail', { id: form.id_sumur });

    setForm(({
      id_kota: '3273',
      id_kecamatan: '',
      id_kelurahan: '',
      id_sumur: '',
    }))
  }

  useEffect(() => {
    getKecamatan();
  }, [])

  return (
    <SafeArea>
      <MainContainer>
        <TitlePage style={{ color: 'black' }}>Search Water Sources</TitlePage>
        <ContainerTitlePage />
        <ContainerSearch>
          <ContainerField>
            <LabelStyle>City</LabelStyle>
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
            <LabelStyle>Subdistrict</LabelStyle>
            <SelectDropdown
              ref={refKecamatan}
              data={optionsKecamatan}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Select Subdistrict'
              onSelect={(selectedItem) => {
                refKelurahan.current.reset()
                refSumur.current.reset()
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
            <LabelStyle>Urban Village</LabelStyle>
            <SelectDropdown
              ref={refKelurahan}
              data={optionKelurahan}
              buttonStyle={{
                width: '100%'
              }}
              defaultButtonText='Select Urban Village'
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label
              }}
              onSelect={(selectedItem) => {
                refSumur.current.reset()
                getSumur(selectedItem.value)
                setForm({
                  ...form,
                  id_kelurahan: selectedItem.value
                })
              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              disabled={form.id_kecamatan === ''}
            />
          </ContainerField>
          <ContainerField>
            <LabelStyle>Find Water Sources</LabelStyle>
            <SelectDropdown
              ref={refSumur}
              data={optionSumur}
              buttonStyle={{
                width: '100%'
              }}
              onSelect={(selectedItem) => {
                setForm({
                  ...form,
                  id_sumur: selectedItem.value
                })
              }}
              defaultButtonText='Select Water Sources'
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
            >View Info</SelectButton>
          </ContainerSelectButton>
        </ContainerSearch>
      </MainContainer>
    </SafeArea>
  )
}