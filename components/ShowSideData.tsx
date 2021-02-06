import {
    Box,
    Text,
    Heading,
    VStack,
    Wrap,
    WrapItem,
    Tag
} from '@chakra-ui/react';

interface SideDataItem {
    heading: string;
    data: string | number;
    isDollar?: boolean;
}

interface ShowSideDataProps {
    status: string;
    origLanguage: string;
    budget: number;
    revenue: number;
    keywords: GenresEntityOrKeywordsEntity[];
}

const SideDataItem = ({ heading, data, isDollar }: SideDataItem) => {
    const displayData = () => {
        if (isDollar) return `$${data.toLocaleString()}`;
        return data;
    };
    return (
        <Box>
            <Heading as="h4" size="md">
                {heading}
            </Heading>
            <Text>{data ? displayData() : '-'}</Text>
        </Box>
    );
};

const ShowSideData = ({
    status,
    origLanguage,
    budget,
    revenue,
    keywords
}: ShowSideDataProps) => {
    return (
        // <VStack spacing="1rem">
        <>
            <SideDataItem heading="Status" data={status} />
            <SideDataItem heading="Original Language" data={origLanguage} />
            <SideDataItem heading="Budget" data={budget} isDollar />
            <SideDataItem heading="Revenue" data={revenue} isDollar />
            <Box>
                <Heading as="h4" size="md" mb="0.5rem">
                    Keywords
                </Heading>
                <Wrap>
                    {keywords.length > 0
                        ? keywords.map(({ name, id }) => (
                              <WrapItem key={id}>
                                  <Tag size="md">{name}</Tag>
                              </WrapItem>
                          ))
                        : '-'}
                </Wrap>
            </Box>
        </>
        // {/* </VStack> */}
    );
};

export default ShowSideData;
