import styled from "styled-components/native"
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';


export const Container = styled.View`
    width: 100%;;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const Logo = styled.Image`
width: 46px;
height: 55px;
`

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`

export const BackIcon = styled(SimpleLineIcons).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))`

`