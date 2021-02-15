import { Box, ButtonProps, useBreakpointValue } from '@chakra-ui/react';
import {
    Paginator,
    Previous,
    Next,
    PageGroup,
    Container
} from 'chakra-paginator';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

interface PaginatorProps {
    quantity: number;
    pageChangeHandler: (currentPage: number) => void;
}

const Pagination = ({ quantity, pageChangeHandler }: PaginatorProps) => {
    const btnSize = useBreakpointValue({ base: 'sm', lg: 'md' });
    const limit = useBreakpointValue({ base: 1, md: 2 });

    const baseStyles: ButtonProps = {
        w: 7,
        fontSize: 'sm',
        size: btnSize
    };

    const normalStyles: ButtonProps = {
        ...baseStyles,
        colorScheme: 'teal',
        variant: 'outline'
    };

    const activeStyles: ButtonProps = {
        ...baseStyles,

        colorScheme: 'teal'
    };

    const separatorStyles: ButtonProps = {
        w: 7,
        colorScheme: 'teal',
        variant: 'ghost'
    };

    return (
        <Paginator
            activeStyles={activeStyles}
            normalStyles={normalStyles}
            separatorStyles={separatorStyles}
            innerLimit={limit}
            outerLimit={limit}
            pagesQuantity={quantity}
            onPageChange={pageChangeHandler}
        >
            <Container align="center" justify="space-between" w="full">
                <Previous colorScheme="teal" size={btnSize}>
                    <FaCaretLeft />
                </Previous>
                <PageGroup isInline align="center" />
                <Next colorScheme="teal" size={btnSize}>
                    <FaCaretRight />
                </Next>
            </Container>
        </Paginator>
    );
};

export default Pagination;
