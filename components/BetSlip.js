import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightAddon,
  Input,
  Text,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';

import { Table, Td, Th, Tr } from '@/components/Table';
import DeleteSelectionIcon from '@/components/DeleteSelectionIcon';

import { balanceAtom, betSlipAtom, placedBetsAtom } from 'atoms';

const BetSlip = () => {
  const [stake, setStake] = useState(0);
  const [toReturn, setToReturn] = useState(0);

  const [balance, setBalance] = useAtom(balanceAtom);
  const [betSlip, setBetSlip] = useAtom(betSlipAtom);
  const [placedBets, setPlacedBets] = useAtom(placedBetsAtom);

  const toast = useToast();

  const totalOdds = betSlip.reduce((acc, el) => acc * el['odds'] || 1, 1);

  const handleSubmit = ev => {
    ev.preventDefault();

    if (balance < stake) {
      toast({
        title: `Your balance is too low...`,
        description: 'Please, modify your stake.',
        status: 'error',
        isClosable: true,
        duration: 4000,
      });

      return;
    }

    const newBet = {
      id: Date.now(),
      betSlip,
      totalOdds: totalOdds.toFixed(2),
      stake: parseFloat(stake).toFixed(2),
      result: 'placed',
    };
    const newBalance = balance - stake;

    setBalance(newBalance);
    setPlacedBets([...placedBets, newBet]);

    toast({
      title: `Your bet was placed successfully.`,
      status: 'success',
      isClosable: true,
      duration: 7000,
    });

    setBetSlip([]);
    setStake(0);
  };

  return (
    <Box maxW="sm" borderRadius="lg" overflow="hidden">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Bet Slip</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {betSlip.map(selection => (
            <Box as="tr" key={selection.id}>
              <Td fontWeight="medium">{selection.name}</Td>
              <Td align="right">
                {selection.outcome} {selection.params && selection.params} @{' '}
                {selection.odds}
              </Td>
              <Td>
                <DeleteSelectionIcon id={selection.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
      <form onSubmit={handleSubmit}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
          padding={3}
        >
          <Stack align="left">
            <Text size={3} fontWeight="medium">
              Total odds: {totalOdds.toFixed(2)}
            </Text>
            <Text size={3} fontWeight="medium">
              Return: {toReturn > 0 ? toReturn.toFixed(2) : '0.00'}€
            </Text>
          </Stack>
          <Stack align="left">
            <InputGroup size="sm" marginRight={-4}>
              <Input
                type="number"
                step="0.01"
                pattern="^[0-9]"
                placeholder="Stake"
                onChange={ev => {
                  setStake(ev.target.value);
                  const parsedStake = parseFloat(ev.target.value);
                  setToReturn(parsedStake * totalOdds.toFixed(2));
                }}
              />
              <InputRightAddon children="€" />
            </InputGroup>
            <Button
              disabled={stake == 0 || stake == ''}
              type="submit"
              background="gray.900"
              fontWeight="medium"
              style={{ color: 'white' }}
              _hover={{ background: 'gray.700' }}
              _active={{
                backgroundColor: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              Place Bet
            </Button>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export default BetSlip;
