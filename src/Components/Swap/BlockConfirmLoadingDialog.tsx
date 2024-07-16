import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Spinner,
  Center,
  Icon,
} from "@chakra-ui/react";
import { Transaction } from "ethers";
import { useEffect, useRef, useState } from "react";
import { TransactionState } from "../../domain/TransactionState";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  transactionState: TransactionState;
}

export const BlockConfirmLoadingDialog = ({
  isOpen,
  onOpen,
  onClose,
  transactionState,
}: Props) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (transactionState == TransactionState.idle) {
      setTitle("");
      isOpen = false;
      return;
    }
    if (transactionState == TransactionState.confirming) {
      setTitle("Approving.....");
      isOpen = true;
      return;
    }
    if (transactionState == TransactionState.confirmed) {
      setTitle("Completed !");
      isOpen = true;
      return;
    }
  }, [transactionState]);

  const cancelRef = useRef();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody paddingBottom={12} paddingTop={4}>
          <Center>
            {transactionState == TransactionState.confirming && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.600"
                size="xl"
              />
            )}
            {transactionState == TransactionState.confirmed && (
              <Icon as={CheckIcon} color="green.500" boxSize={12} />
            )}
          </Center>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};
