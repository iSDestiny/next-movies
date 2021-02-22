import {
    Box,
    Button,
    DarkMode,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip,
    useColorMode
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { FaCaretDown, FaMoon, FaSearch, FaSun, FaTimes } from 'react-icons/fa';
import MenuToggle from './MenuToggle';
import MobileNav from './MobileNav';
import MotionBox from './MotionBox';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = colorMode === 'light' ? 'black' : 'white';
    const menuBgColor = colorMode === 'light' ? 'white' : 'gray.700';
    const menuHoverColor = colorMode === 'light' ? 'gray.100' : 'gray.600';

    const { scrollY } = useViewportScroll();
    const hideVariants = {
        show: {
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 700,
                damping: 100
            }
        },
        hide: {
            y: '-100%',
            transition: {
                type: 'spring',
                stiffness: 700,
                damping: 100
            }
        }
    };

    useEffect(() => {
        document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
    }, [isMenuOpen]);

    useEffect(() => {
        const handleNavScroll = () => {
            setIsNavHidden(scrollY.getPrevious() < scrollY.get());
        };

        const unsubY = scrollY.onChange(handleNavScroll);

        return () => {
            unsubY();
        };
    }, []);

    return (
        <FocusLock disabled={!isMenuOpen}>
            <MobileNav
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
            <DarkMode>
                <MotionBox
                    initial={false}
                    variants={hideVariants}
                    animate={isNavHidden ? 'hide' : 'show'}
                    as="header"
                    bgColor="gray.900"
                    position="fixed"
                    width="100%"
                    zIndex="9999"
                >
                    <Flex
                        as="nav"
                        justify="space-between"
                        align="center"
                        maxW="1400px"
                        margin="auto"
                        padding="0 1rem"
                        height="65px"
                    >
                        <HStack
                            as="ul"
                            spacing="0.5rem"
                            listStyleType="none"
                            align="center"
                            justify="flex-start"
                        >
                            <MotionBox
                                pl="1rem"
                                as="li"
                                zIndex="4"
                                exit="closed"
                                initial={false}
                                animate={isMenuOpen ? 'open' : 'closed'}
                                display={{ base: 'block', md: 'none' }}
                            >
                                <MenuToggle
                                    toggle={() =>
                                        setIsMenuOpen((prev) => !prev)
                                    }
                                />
                            </MotionBox>
                            <Box as="li" zIndex="4" mr="2rem">
                                <NextLink href="/" passHref>
                                    <Link
                                        zIndex="4"
                                        color="white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Next Movies
                                        {/* <Image
                                            priority
                                            width="220"
                                            height="50"
                                            alt="personal brand logo"
                                            src={
                                                colorMode === 'light'
                                                    ? '/static/logos/brand/j-full-logo-transparent-black.png'
                                                    : '/static/logos/brand/j-full-logo-transparent-white.png'
                                            }
                                        /> */}
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={
                                            <FaCaretDown fontSize="1rem" />
                                        }
                                        variant="ghost"
                                    >
                                        Movies
                                    </MenuButton>

                                    <MenuList
                                        border="1px solid transparent"
                                        bgColor={menuBgColor}
                                    >
                                        <MenuItem
                                            _focus={{ bgColor: menuHoverColor }}
                                        >
                                            <NextLink href="/movies" passHref>
                                                <Link color={textColor}>
                                                    Browse
                                                </Link>
                                            </NextLink>
                                        </MenuItem>
                                        <MenuItem
                                            _focus={{ bgColor: menuHoverColor }}
                                        >
                                            <NextLink
                                                href="/movies/trending"
                                                passHref
                                            >
                                                <Link color={textColor}>
                                                    Trending
                                                </Link>
                                            </NextLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={
                                            <FaCaretDown fontSize="1rem" />
                                        }
                                        variant="ghost"
                                    >
                                        TV Shows
                                    </MenuButton>
                                    <MenuList
                                        border="1px solid transparent"
                                        bgColor={menuBgColor}
                                    >
                                        <MenuItem
                                            _focus={{ bgColor: menuHoverColor }}
                                        >
                                            <NextLink href="/tv" passHref>
                                                <Link color={textColor}>
                                                    Browse
                                                </Link>
                                            </NextLink>
                                        </MenuItem>
                                        <MenuItem
                                            _focus={{ bgColor: menuHoverColor }}
                                        >
                                            <NextLink
                                                href="/tv/trending"
                                                passHref
                                            >
                                                <Link color={textColor}>
                                                    Trending
                                                </Link>
                                            </NextLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </HStack>
                        <HStack as="ul" spacing="1.5rem" listStyleType="none">
                            <HStack as="li" position="relative">
                                <Tooltip label="Toggle light/dark mode">
                                    <IconButton
                                        size="md"
                                        zIndex="4"
                                        aria-label="dark light switch"
                                        variant="ghost"
                                        borderRadius="50%"
                                        onClick={toggleColorMode}
                                        icon={
                                            colorMode === 'light' ? (
                                                <FaMoon fontSize="1.2rem" />
                                            ) : (
                                                <FaSun fontSize="1.2rem" />
                                            )
                                        }
                                    />
                                </Tooltip>
                                <Tooltip
                                    label={
                                        isSearchOpen ? 'Close Search' : 'Search'
                                    }
                                >
                                    <IconButton
                                        onClick={() =>
                                            setIsSearchOpen((prev) => !prev)
                                        }
                                        size="md"
                                        zIndex="4"
                                        aria-label="search"
                                        variant="ghost"
                                        borderRadius="50%"
                                        icon={
                                            isSearchOpen ? (
                                                <FaTimes fontSize="1.2rem" />
                                            ) : (
                                                <FaSearch fontSize="1.2rem" />
                                            )
                                        }
                                    />
                                </Tooltip>
                            </HStack>
                        </HStack>
                    </Flex>
                    <SearchBar
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                    />
                </MotionBox>
            </DarkMode>
        </FocusLock>
    );
};

export default Navbar;
