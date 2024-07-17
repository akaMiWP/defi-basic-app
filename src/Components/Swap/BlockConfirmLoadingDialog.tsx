import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  Spinner,
  Center,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { TransactionState } from "../../domain/TransactionState";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionState: TransactionState;
}

export const BlockConfirmLoadingDialog = ({
  isOpen,
  onClose,
  transactionState,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const spinnerColor = useColorModeValue("orange.400", "teal.600");

  useEffect(() => {
    if (transactionState == TransactionState.idle) {
      setTitle("");
      isOpen = false;
      return;
    }
    if (transactionState == TransactionState.confirming) {
      setTitle("Submitting your transaction..");
      isOpen = true;
      return;
    }
    if (transactionState == TransactionState.confirmed) {
      setTitle("Completed");
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
                color={spinnerColor}
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
