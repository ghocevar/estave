import Link from 'next/link';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { Link as ChakraLink, Box, Button, useToast } from '@chakra-ui/react';

import { Table, Td, Th, Tr } from '@/components/Table';

import { betSlipAtom } from 'atoms';

import fetcher from '@/utils/fetcher';
import findInBetSlip from '@/utils/findInBetSlip';

const Games = () => {
  const { data, error } = useSWR('/api/competitions/nba', fetcher);
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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box overflowX="none">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Event</Th>
            <Th>Home</Th>
            <Th>Away</Th>
          </Tr>
        </thead>
        <tbody>
          {data.data.map(event => {
            const selections =
              event.markets['basketball.moneyline'].submarkets[
                'period=ot&period=ft'
              ].selections;

            const validOdds =
              event.status === 'TRADING' &&
              selections[0].status === 'SELECTION_ENABLED' &&
              selections[1].status === 'SELECTION_ENABLED';

            return (
              validOdds && (
                <Box as="tr" key={event.id}>
                  <Td fontWeight="medium">
                    <Link href={`/event/${event.id}`} passHref>
                      <ChakraLink id={`event-${event.id}`} fontWeight="medium">
                        {event.name}
                      </ChakraLink>
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      background="gray.900"
                      fontWeight="medium"
                      style={{ color: 'white' }}
                      _hover={{ background: 'gray.700' }}
                      _active={{
                        backgroundColor: 'gray.800',
                        transform: 'scale(0.95)',
                      }}
                      onClick={() => addToBetSlip(event, selections[0])}
                    >
                      {selections[0].price}
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      background="gray.900"
                      fontWeight="medium"
                      style={{ color: 'white' }}
                      _hover={{ background: 'gray.700' }}
                      _active={{
                        backgroundColor: 'gray.800',
                        transform: 'scale(0.95)',
                      }}
                      onClick={() => addToBetSlip(event, selections[1])}
                    >
                      {selections[1].price}
                    </Button>
                  </Td>
                </Box>
              )
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default Games;
