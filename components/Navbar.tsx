import {
    Box,
    DarkMode,
    Flex,
    HStack,
    IconButton,
    Link,
    Tooltip,
    useBreakpointValue,
    useColorMode
} from '@chakra-ui/react';
import { AnimatePresence, useViewportScroll } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { FaMoon, FaSun, FaSearch, FaTimes } from 'react-icons/fa';
import MenuToggle from './MenuToggle';
import MobileNav from './MobileNav';
import MotionBox from './MotionBox';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { scrollY } = useViewportScroll();
    const router = useRouter();
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
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <MobileNav
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                            key="mobile-nav"
                        />
                    </>
                )}
            </AnimatePresence>
            <DarkMode>
                <MotionBox
                    initial={false}
                    variants={hideVariants}
                    animate={isNavHidden ? 'hide' : 'show'}
                    as="header"
                    bgColor="gray.900"
                    position="fixed"
                    width="100%"
                    zIndex="5"
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
                            spacing={{ base: '0.5rem', md: '1.5rem' }}
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
                            <Box as="li" zIndex="4">
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
                                <NextLink href="/movies" passHref>
                                    <Link
                                        color="white"
                                        borderBottom={
                                            router.pathname === '/movies'
                                                ? '4px solid teal'
                                                : 'none'
                                        }
                                        pb="3px"
                                        _hover={{
                                            borderBottom: '4px solid teal'
                                        }}
                                    >
                                        Movies
                                    </Link>
                                </NextLink>
                            </Box>
                            <Box
                                as="li"
                                display={{ base: 'none', md: 'block' }}
                            >
                                <NextLink href="/tv" passHref>
                                    <Link
                                        color="white"
                                        borderBottom={
                                            router.pathname === '/tv'
                                                ? '4px solid teal'
                                                : 'none'
                                        }
                                        pb="3px"
                                        _hover={{
                                            borderBottom: '4px solid teal'
                                        }}
                                    >
                                        TV Shows
                                    </Link>
                                </NextLink>
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
