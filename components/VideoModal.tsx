import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue
} from '@chakra-ui/react';
import ReactPlayer from 'react-player/youtube';

interface VideoModalProps {
    url: string;
    name: string;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal = ({ url, name, isOpen, onClose }: VideoModalProps) => {
    const width = useBreakpointValue({
        base: '365px',
        md: '755px',
        sm: '650px',
        lg: '1000px',
        xl: '1280px'
    });

    const height = useBreakpointValue({
        base: '205px',
        sm: '366px',
        md: '425px',
        lg: '563px',
        xl: '720px'
    });
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="6xl"
            motionPreset="scale"
            preserveScrollBarGap={false}
        >
            <ModalOverlay>
                <ModalContent bgColor="black" as={Flex} justify="center" p="0">
                    <ModalHeader color="white">{name}</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody as={Flex} justify="center" p="0px">
                        <ReactPlayer
                            url={url}
                            width={width}
                            height={height}
                            playing
                            controls
                        />
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};

export default VideoModal;
