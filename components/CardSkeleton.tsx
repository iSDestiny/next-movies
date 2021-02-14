import { HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

const CardSkeleton = () => {
    return (
        <HStack w="100%" height="180px">
            <Skeleton w="100px" height="100%" />
            <VStack w="70%" align="flex-start">
                <SkeletonText width="50%" height="16px" noOfLines={1} />
                <SkeletonText w="100%" height="16px" noOfLines={4} />
            </VStack>
        </HStack>
    );
};

export default CardSkeleton;
