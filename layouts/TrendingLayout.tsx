import { Box } from '@chakra-ui/react';

interface TrendingLayoutProps {
    daily: Trending;
    weekly: Trending;
    mediaType: 'movie' | 'tv';
}

const TrendingLayout = ({ daily, weekly, mediaType }: TrendingLayoutProps) => {
    return <Box width="100%" maxWidth="1400px" m="auto" p="1rem"></Box>;
};

export default TrendingLayout;
