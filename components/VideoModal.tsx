import {
    AspectRatio,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Portal,
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
    return (
        <Portal>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                size="6xl"
                motionPreset="scale"
                preserveScrollBarGap
                blockScrollOnMount
                allowPinchZoom
            >
                <ModalOverlay zIndex="9998">
                    <ModalContent
                        bgColor="black"
                        justify="center"
                        m="1rem"
                        zIndex="9999"
                    >
                        <>
                            <ModalHeader
                                color="white"
                                fontSize={{
                                    base: '0.8rem',
                                    sm: '1rem',
                                    md: '1.1rem',
                                    lg: '1.3rem'
                                }}
                            >
                                {name}
                            </ModalHeader>
                            <ModalCloseButton color="white" />
                            <ModalBody
                                as={AspectRatio}
                                justify="center"
                                p="0px"
                                ratio={1280 / 720}
                                maxHeight="70vh"
                                maxWidth="1280px"
                            >
                                <ReactPlayer
                                    url={url}
                                    width="100%"
                                    height="100%"
                                    playing
                                    controls
                                />
                            </ModalBody>
                        </>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Portal>
    );
};

export default VideoModal;
