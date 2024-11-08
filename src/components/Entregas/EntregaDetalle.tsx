import React, {useCallback, useState} from 'react';
import Contenedor from 'common/Contenedor';
import {Box, Center, HStack, Image, Text} from 'native-base';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import colores from 'assets/theme/colores';
import {ScrollView} from 'react-native';
import TextoFecha from 'common/TextoFecha';
import ContenedorAnimado from 'common/ContendorAnimado';
import {consultarApi} from 'utils/api';
import {Entrega, RespuestaEntregaDetalle} from 'interface/entrega';

const EntregaDetalle = () => {
  const route = useRoute();

  const {entregaId} = route.params;
  const [entrega, setEntrega] = useState<Entrega>({
    id: 0,
    celda: 0,
    fechaIngreso: '',
    descripcion: null,
    entregaTipoId: 0,
    entregaTipoNombre: '',
    estadoAutorizado: 'P',
    estadoCerrado: false,
    urlImagen: undefined,
    urlImagenIngreso: '',
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => consultarEntregaDetalle();
      unsubscribe();
    }, []),
  );

  const consultarEntregaDetalle = async () => {
    try {
      const {respuesta, status} = await consultarApi<RespuestaEntregaDetalle>(
        'api/entrega/detalle',
        {
          codigoEntrega: entregaId,
        },
      );
      if (status === 200) {
        setEntrega(respuesta.entrega);
      }
    } catch (error: any) {}
  };

  return (
    <ScrollView>
      <Contenedor>
        <ContenedorAnimado>
          <Box
            marginBottom={2}
            padding={2}
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            justifyContent={'space-between'}>
            <Center>
              <Text
                fontSize={'3xl'}
                fontWeight={'bold'}
                color={colores.primary}>
                {entrega.entregaTipoNombre}
              </Text>
            </Center>
            <HStack space={2}>
              <Text fontWeight={'bold'}>Código:</Text>
              <Text>{entrega.id}</Text>
            </HStack>
            <HStack space={2}>
              <Text fontWeight={'bold'}>Fecha:</Text>
              <TextoFecha fecha={entrega.fechaIngreso} />
            </HStack>
            <HStack space={2}>
              <Text fontWeight={'bold'}>Descripción:</Text>
              <Text>{entrega.descripcion ?? 'no aplica'}</Text>
            </HStack>
          </Box>
        </ContenedorAnimado>
        <>
          {entrega?.urlImagenIngreso ? (
            <ContenedorAnimado delay={200}>
              <Box
                marginBottom={2}
                padding={2}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                justifyContent={'space-between'}>
                <Center>
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={colores.primary}>
                    Ingreso
                  </Text>
                </Center>
                <Image
                  source={{
                    uri: entrega?.urlImagenIngreso,
                  }}
                  alt="No presenta imagen de ingreso"
                  size={'2xl'}
                  width={'100%'}
                  resizeMode="cover"
                />
              </Box>
            </ContenedorAnimado>
          ) : null}
        </>
        <>
          {entrega?.urlImagen ? (
            <ContenedorAnimado delay={entrega?.urlImagenIngreso ? 300 : 200}>
              <Box
                marginBottom={2}
                padding={2}
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                justifyContent={'space-between'}>
                <Center>
                  <Text
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={colores.primary}>
                    entrega
                  </Text>
                </Center>
                <Image
                  source={{
                    uri: entrega?.urlImagen,
                  }}
                  alt="No presenta imagen de entrega"
                  size={'2xl'}
                  width={'100%'}
                  resizeMode="cover"
                />
              </Box>
            </ContenedorAnimado>
          ) : null}
        </>
      </Contenedor>
    </ScrollView>
  );
};

export default EntregaDetalle;
