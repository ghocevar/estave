import { useAtom } from 'jotai';
import { Box, Button, Heading, Stack, useToast } from '@chakra-ui/react';

import { Table, Td, Th, Tr } from '@/components/Table';

import { betSlipAtom } from 'atoms';

import findInBetSlip from '@/utils/findInBetSlip';

const Game = ({ event }) => {
  const toast = useToast();
  const [betSlip, setBetSlip] = useAtom(betSlipAtom);

  const addToBetSlip = (event, selection) => {
    const newSelection = {
      id: event.id,
      name: event.name,
      outcome: selection.outcome,
      params: selection.params,
      odds: selection.price,
    };

    if (findInBetSlip(betSlip, newSelection.id)) {
      toast({
        title: `You already have a selection from this game in Bet slip`,
        description:
          'If you want to change selection, first delete previous selection from Bet slip.',
        status: 'warning',
        isClosable: true,
        duration: 6000,
      });

      return;
    }

    setBetSlip([...betSlip, newSelection]);
  };

  const moneyline =
    event.markets['basketball.moneyline'].submarkets['period=ot&period=ft']
      .selections;

  const totals =
    event.markets['basketball.totals'].submarkets['period=ot&period=ft']
      .selections;

  const handicaps =
    event.markets['basketball.handicap'].submarkets['period=ot&period=ft']
      .selections;

  return (
    <Stack spacing={6}>
      <Box>
        <Heading as="h3" size="md" marginBottom={5}>
          Moneyline
        </Heading>
        <Box overflowX="none">
          <Table w="full">
            <thead>
              <Tr>
                <Th align="center">Home</Th>
                <Th align="center">Away</Th>
              </Tr>
            </thead>
            <tbody>
              {moneyline && (
                <Box as="tr">
                  <Td align="center">
                    <Button
                      background="gray.900"
                      fontWeight="medium"
                      style={{ color: 'white' }}
                      _hover={{ background: 'gray.700' }}
                      _active={{
                        backgroundColor: 'gray.800',
                        transform: 'scale(0.95)',
                      }}
                      onClick={() => addToBetSlip(event, moneyline[0])}
                    >
                      {moneyline[0].price}
                    </Button>
                  </Td>
                  <Td align="center">
                    <Button
                      background="gray.900"
                      fontWeight="medium"
                      style={{ color: 'white' }}
                      _hover={{ background: 'gray.700' }}
                      _active={{
                        backgroundColor: 'gray.800',
                        transform: 'scale(0.95)',
                      }}
                      onClick={() => addToBetSlip(event, moneyline[1])}
                    >
                      {moneyline[1].price}
                    </Button>
                  </Td>
                </Box>
              )}
            </tbody>
          </Table>
        </Box>
      </Box>

      <Box>
        <Heading as="h3" size="md" marginBottom={5}>
          Handicaps
        </Heading>
        <Box overflowX="none">
          <Table w="full">
            <thead>
              <Tr>
                <Th align="center">Home</Th>
                <Th align="center">Away</Th>
              </Tr>
            </thead>
            <tbody>
              {handicaps.map((_, i) => {
                return (
                  i % 2 === 0 && (
                    <Box as="tr">
                      <Td align="center">
                        <Button
                          background="gray.900"
                          fontWeight="medium"
                          style={{ color: 'white' }}
                          _hover={{ background: 'gray.700' }}
                          _active={{
                            backgroundColor: 'gray.800',
                            transform: 'scale(0.95)',
                          }}
                          onClick={() => addToBetSlip(event, handicaps[i])}
                        >
                          {handicaps[i].params.split('=')[1]}
                          {` - `}
                          {handicaps[i].price}
                        </Button>
                      </Td>
                      <Td align="center">
                        <Button
                          background="gray.900"
                          fontWeight="medium"
                          style={{ color: 'white' }}
                          _hover={{ background: 'gray.700' }}
                          _active={{
                            backgroundColor: 'gray.800',
                            transform: 'scale(0.95)',
                          }}
                          onClick={() => addToBetSlip(event, handicaps[i + 1])}
                        >
                          {handicaps[i + 1].params.split('=')[1]}
                          {` - `}
                          {handicaps[i + 1].price}
                        </Button>
                      </Td>
                    </Box>
                  )
                );
              })}
            </tbody>
          </Table>
        </Box>
      </Box>

      <Box paddingBottom={8}>
        <Heading as="h3" size="md" marginBottom={5}>
          Total points
        </Heading>
        <Box overflowX="none">
          <Table w="full">
            <thead>
              <Tr>
                <Th align="center">Over</Th>
                <Th align="center">Under</Th>
              </Tr>
            </thead>
            <tbody>
              {totals.map((_, i) => {
                return (
                  i % 2 === 0 && (
                    <Box as="tr">
                      <Td align="center">
                        <Button
                          background="gray.900"
                          fontWeight="medium"
                          style={{ color: 'white' }}
                          _hover={{ background: 'gray.700' }}
                          _active={{
                            backgroundColor: 'gray.800',
                            transform: 'scale(0.95)',
                          }}
                          onClick={() => addToBetSlip(event, totals[i])}
                        >
                          {totals[i].params.split('=')[1]}
                          {` - `}
                          {totals[i].price}
                        </Button>
                      </Td>
                      <Td align="center">
                        <Button
                          background="gray.900"
                          fontWeight="medium"
                          style={{ color: 'white' }}
                          _hover={{ background: 'gray.700' }}
                          _active={{
                            backgroundColor: 'gray.800',
                            transform: 'scale(0.95)',
                          }}
                          onClick={() => addToBetSlip(event, totals[i + 1])}
                        >
                          {totals[i + 1].params.split('=')[1]}
                          {` - `}
                          {totals[i + 1].price}
                        </Button>
                      </Td>
                    </Box>
                  )
                );
              })}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
};

export default Game;
