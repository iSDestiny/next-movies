import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex
            height="150px"
            width="100%"
            justify="center"
            align="center"
            position="absolute"
            bottom="0"
            direction="column"
            bgColor="gray.900"
            color="white"
            p={['1rem', '1rem', '1.5rem', '2rem']}
        >
            <Text>Created By Jason Bugallon</Text>
            <Text>
                Data and design belongs to{' '}
                <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.themoviedb.org/"
                    aria-label="TMDb"
                    color="teal.500"
                >
                    TMDb
                </Link>
            </Text>
            <Text>Made with Next.js and Deployed on Vercel</Text>
            <Text>{`Next Movies © ${new Date().getFullYear()}`}</Text>
        </Flex>
    );
};

export default Footer;
