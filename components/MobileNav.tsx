import NextLink from 'next/link';
import { Box, Link, useColorMode, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import MotionBox from './MotionBox';

interface MobileNavProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
    const router = useRouter();
    const { colorMode } = useColorMode();

    const menuVariants = {
        open: {
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 40
            }
        },
        closed: {
            y: '-100%',
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 40
            }
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setIsOpen(false);
    };

    useEffect(() => {
        document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
        document.addEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <MotionBox
            display={{ base: 'block', md: 'none' }}
            transform="translateY(-100%)"
            initial="closed"
            animate="open"
            as="nav"
            overflow="hidden"
            width="100%"
            variants={menuVariants}
            exit="closed"
            height="100vh"
            bg="gray.900"
            position="fixed"
            zIndex="3"
            top="0"
        >
            <VStack
                listStyleType="none"
                as="ul"
                justify="center"
                align="center"
                width="100%"
                height="100%"
                spacing="1.5rem"
                color="white"
            >
                <Box as="li">
                    <NextLink href="/" passHref>
                        <Link
                            onClick={() => setIsOpen(false)}
                            fontSize="2rem"
                            borderBottom={
                                router.pathname === '/'
                                    ? '6px solid teal'
                                    : 'none'
                            }
                            pb="3px"
                            _hover={{
                                borderBottom: '6px solid teal'
                            }}
                        >
                            Home
                        </Link>
                    </NextLink>
                </Box>
                <Box as="li">
                    <NextLink href="/movies" passHref>
                        <Link
                            onClick={() => setIsOpen(false)}
                            fontSize="2rem"
                            borderBottom={
                                router.pathname === '/movies'
                                    ? '6px solid teal'
                                    : 'none'
                            }
                            pb="3px"
                            _hover={{
                                borderBottom: '6px solid teal'
                            }}
                        >
                            Movies
                        </Link>
                    </NextLink>
                </Box>
                <Box as="li">
                    <NextLink href="/tv" passHref>
                        <Link
                            onClick={() => setIsOpen(false)}
                            fontSize="2rem"
                            borderBottom={
                                router.pathname === '/tv'
                                    ? '6px solid teal'
                                    : 'none'
                            }
                            pb="3px"
                            _hover={{
                                borderBottom: '6px solid teal'
                            }}
                        >
                            TV Shows
                        </Link>
                    </NextLink>
                </Box>
            </VStack>
        </MotionBox>
    );
};

export default MobileNav;
