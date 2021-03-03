import { Box } from '@chakra-ui/react';
import GeneralLayout from 'layouts/GeneralLayout';
import ShowPageSkeletonHeader from './ShowPageSkeletonHeader';

const ShowPageSkeleton = () => {
    return (
        <GeneralLayout title="Loading...">
            <Box as="main">
                <ShowPageSkeletonHeader />
            </Box>
        </GeneralLayout>
    );
};

export default ShowPageSkeleton;
