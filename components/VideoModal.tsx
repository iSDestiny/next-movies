import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
            <ModalOverlay>
                <ModalContent bgColor="black" as={Flex} justify="center" p="0">
                    <ModalHeader color="white">{name}</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody as={Flex} justify="center" p="0">
                        <ReactPlayer
                            url={url}
                            width={1280}
                            height={720}
                            controls
                        />
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};

export default VideoModal;
