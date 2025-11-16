import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    bg: {
      light: '#ffffff',
      dark: '#000000',
    },
    text: {
      primary: '#000000',
      muted: '#666666',
      light: '#ffffff',
    },
    accent: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999',
      500: '#000000',
      600: '#000000',
      700: '#000000',
      800: '#000000',
      900: '#000000',
    },
  },
  fonts: {
    heading: `'Courier New', 'Courier', monospace`,
    body: `'Courier New', 'Courier', monospace`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#000000' : '#ffffff',
        color: props.colorMode === 'dark' ? '#ffffff' : '#000000',
        fontFamily: 'body',
        letterSpacing: '0.05em',
      },
      '*': {
        borderColor: props.colorMode === 'dark' ? '#333333' : '#cccccc',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: '0',
        border: '1px solid',
        borderColor: 'black',
        fontFamily: 'mono',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
      variants: {
        primary: {
          bg: 'black',
          color: 'white',
          borderColor: 'black',
          _hover: {
            bg: 'white',
            color: 'black',
            borderColor: 'black',
          },
          _active: {
            bg: 'black',
            color: 'white',
          },
        },
        secondary: {
          bg: 'transparent',
          border: '1px solid',
          borderColor: 'black',
          color: 'black',
          _hover: {
            bg: 'black',
            color: 'white',
            borderColor: 'black',
          },
          _dark: {
            borderColor: 'white',
            color: 'white',
            _hover: {
              bg: 'white',
              color: 'black',
              borderColor: 'white',
            },
          },
        },
      },
    },
  },
})

export default theme

