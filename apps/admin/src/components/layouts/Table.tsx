import {
  TableContainer,
  Table as ChakraTable,
  Tr,
  Td,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
} from '@chakra-ui/react';
import { Spinner } from 'ui';

export const LoadingRow: React.FC<{ colSpan: number }> = function LoadingRow({
  colSpan,
}) {
  return (
    <Tr>
      <Td colSpan={colSpan} className="text-center">
        <Flex p={1.5} justifyContent="center" alignItems="center">
          <Spinner m="auto" size="lg" thickness="3px" />
        </Flex>
      </Td>
    </Tr>
  );
};

export const EmptyRow: React.FC<{ message: string; colSpan: number }> =
  function EmptyRow({ message, colSpan }) {
    return (
      <Tr backgroundColor="gray.50">
        <Td colSpan={colSpan} className="text-center">
          <Alert status="info" borderRadius="2xl">
            <AlertIcon />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </Td>
      </Tr>
    );
  };

const Table = function Table({ children }: { children: React.ReactNode }) {
  return (
    <TableContainer borderRadius="2xl" boxShadow="base">
      <ChakraTable variant="striped">{children}</ChakraTable>
    </TableContainer>
  );
};

export default Table;
