import { Text, TextInput } from "react-native-paper"
import { Image, TouchableOpacity, View } from 'react-native';
import { theme } from "../../../infrastructure/theme"
import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  MainContainer,
  IndexContainer,
  BoxIndexContainer,
  Title,
  InformationContainer,
  BodyText,
  DescripContainer,
} from "../components/detailpage.style"

export const DetailPageScreen = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const dataWater = useSelector((store) => store.updateDataWater.updateDataWater);
  const [dataDetail, setDataDetail] = useState({});
  const [dataFile, setDataFile] = useState({});

  const getWaterQualityText = () => {
    switch (dataDetail.class_data) {
      case 0:
        return <Title style={{ color: theme.colors.class.one, marginTop: 10 }}>Bagus</Title>
      case 1:
        return <Title style={{ color: theme.colors.class.two, marginTop: 10 }}>Tercemar Ringan </Title>
      case 2:
        return <Title style={{ color: theme.colors.class.three, marginTop: 10 }}>Tercemar Sedang</Title>
      case 3:
        return <Title style={{ color: theme.colors.class.four, marginTop: 10 }}>Tercemar Berat</Title>
    }
  }

  const getWaterQualityNumber = () => {
    switch (dataDetail.class_data) {
      case 0:
        return <Title style={{ color: theme.colors.class.one, marginTop: 10 }}>1</Title>
      case 1:
        return <Title style={{ color: theme.colors.class.two, marginTop: 10 }}>2</Title>
      case 2:
        return <Title style={{ color: theme.colors.class.three, marginTop: 10 }}>3</Title>
      case 3:
        return <Title style={{ color: theme.colors.class.four, marginTop: 10 }}>4</Title>
    }
  }

  const getDescriptionIndex = () => {
    switch (dataDetail.class_data) {
      case 0:
        return 'Kelas I (Bagus), air yang peruntukannya dapat digunakan untuk air baku air minum, dan atau peruntukan lain yang mempersyaratkan mutu air yang sama dengan kegunaan tersebut.'
      case 1:
        return 'Kelas II (Tercemar Ringan), air yang peruntukannya dapat digunakan untuk sarana/prasarana rekreasi air, pembudidayaan ikan air tawar, peternakan, air untuk mengairi pertanaman, dan atau peruntukan lain yang mempersyaratkan mutu air yang sama dengan kegunaan tersebut.'
      case 2:
        return 'Kelas III (Tercemar Sedang), air yang peruntukkannya dapat digunakan untuk pembudidayaan ikan air tawar, peternakan, air untuk mengairi pertanaman, dan atau peruntukan lain yang mempersyaratkan mutu air yang sama dengan kegunaan tersebut.'
      case 3:
        return 'Kelas IV (Tercemar Berat), air yang peruntukkannya dapat digunakan untuk mengairi pertanaman dan atau peruntukan lain yang mempersyaratkan mutu air yang sama dengan kegunaan tersebut.'
    }
  }

  const downloadFileFromApi = async () => {
    try {
      const apiUrl = `http://localhost:8000/water_quality/download/${dataFile?.id}`
      const response = await axios.get(apiUrl, { responseType: 'blob' });
      const fr = new FileReader();
      let fileUri = ''
      fr.onload = async () => {
        fileUri = `${FileSystem.cacheDirectory}${dataFile?.title}`;
        console.log('url file: ', fileUri)
        await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });

        Toast.show({
          type: 'success',
          text1: 'Sukses',
          text2: 'File sukses di download!'
        });
      };
      fr.readAsDataURL(response.data);
    } catch (error) {
      console.error('Error downloading file:', error);
      return null;
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/water_quality-get-initial-data/${id}`)
  }, [id])

  useEffect(() => {
    if (dataWater) {
      const parseDataWater = JSON.parse(dataWater)
      if (id === parseDataWater?.detail?.id) {
        const title = parseDataWater?.file?.file?.split('/')
        setDataFile({
          ...parseDataWater?.file,
          title: title[1],
          id: parseDataWater?.file?.id
        })
        setDataDetail(parseDataWater?.detail)
      }
    }
  }, [dataWater])

  return (
    <MainContainer>
      <View style={{ padding: 20 }}>
        <IndexContainer>
          <BoxIndexContainer>
            <Title style={{ color: theme.colors.color.white }}>Kualitas Air</Title>
            <Image
              style={{ marginTop: 10 }}
              source={require('../../../../assets/water-quality-icon.png')}></Image>
            {
              getWaterQualityText()
            }
          </BoxIndexContainer>
          <BoxIndexContainer>
            <Title style={{ color: theme.colors.color.white }}>Kelas</Title>
            <Image
              style={{ marginTop: 10 }}
              source={require('../../../../assets/class-icon.png')}></Image>
            {
              getWaterQualityNumber()
            }
          </BoxIndexContainer>
        </IndexContainer>

        <InformationContainer>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Title style={{ color: theme.colors.color.black }}>Informasi</Title><Image
              source={require('../../../../assets/info-icon.png')}></Image>
          </View>
          <BodyText style={{ color: theme.colors.color.black, marginTop: 10 }}>
            {
              getDescriptionIndex()
            }
          </BodyText>
        </InformationContainer>
      </View>

      <DescripContainer>
        <Title style={{ color: theme.colors.bg.secondary }}>Info Sumur</Title>
        <BodyText style={{ color: theme.colors.color.black, fontWeight: 'bold', fontFamily: theme.fonts.body_bold, marginTop: 10 }}>Nama Sumur</BodyText>
        <TextInput
          placeholder="Nama Sumur"
          value={dataDetail?.nama_sumur}
          style={{ backgroundColor: theme.colors.color.grey, height: 30, paddingTop: 5, paddingBottom: 5 }}
          disabled
        />
        <BodyText style={{ color: theme.colors.color.black, fontWeight: 'bold', fontFamily: theme.fonts.body_bold, marginTop: 10 }}>Alamat Sumur</BodyText>
        <TextInput
          placeholder="Alamat Sumur"
          multiline={true}
          style={{ height: 100, textAlignVertical: 'top', }}
          value={dataDetail?.alamat}
          disabled
        />

        <View>
          <BodyText style={{ color: theme.colors.color.black, fontWeight: 'bold', fontFamily: theme.fonts.body_bold, marginTop: 10 }}>
            Attachment
          </BodyText>
          <TouchableOpacity onPress={downloadFileFromApi}>
            <Image
              style={{ marginTop: 10 }}
              source={require('../../../../assets/file-icon.png')}></Image>
            <BodyText style={{ color: theme.colors.color.black }}>
              {dataFile?.title}
            </BodyText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: theme.colors.color.black,
            marginTop: 20,
          }}>
          <View style={{ height: 0 }} />
        </View>

        <Title style={{ color: theme.colors.bg.secondary, marginTop: 20 }}>Analisis Air</Title>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 10
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>1. Zat Organik
                <Title style={{
                  fontStyle: 'italic',
                  color: theme.colors.color.white,
                  fontFamily: theme.fonts.regular_italic
                }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.zat_organik}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>2. Zat Padat Terlarut<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.tds}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>3. Mangan<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.mangan}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>4. Klorida<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.klorida}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>5. Kekeruhan<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (NTU)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.kekeruhan}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>6. Fluorida<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.fluorida}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>7. pH<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (-)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.ph}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>8. Kesadahan<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.kesadahan}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>9. Sulfat<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (mg/l)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.sulfat}</Title>
          </View>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          width: 351,
          height: 41,
          borderWidth: 2,
          borderColor: theme.colors.bg.primary,
          borderRadius: 5,
          marginTop: 7
        }}>
          <View style={{ width: 263, backgroundColor: theme.colors.bg.primary, paddingHorizontal: 10 }}>
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Title style={{ color: theme.colors.color.white }}>10. Suhu<Title style={{
                fontStyle: 'italic',
                color: theme.colors.color.white,
                fontFamily: theme.fonts.regular_italic
              }}> (C)</Title></Title>
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1
          }}
          >
            <Title style={{ color: theme.colors.bg.primary, textAlign: 'center' }}>{dataDetail?.suhu}</Title>
          </View>
        </View>
      </DescripContainer>
    </MainContainer>
  )
}