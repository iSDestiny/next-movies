import { extendTheme, ThemeOverride } from '@chakra-ui/react';
import styles from './styles';

const overrides: ThemeOverride = {
    styles,
    components: {
        Link: {
            baseStyle: {
                _hover: {
                    textDecoration: 'none'
                }
            }
        }
    }
};

export default extendTheme(overrides);
