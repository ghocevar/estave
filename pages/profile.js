import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { Heading, Stack, Button, Box, Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Header from '@/components/Header';
import { Table, Tr, Th, Td } from '@/components/Table';

import { placedBetsAtom } from 'atoms';

const Profile = () => {
  const router = useRouter();
  const [placedBets] = useAtom(placedBetsAtom);

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Header />

      {placedBets.length ? (
        <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
          <Stack spacing={6} marginBottom={6}>
            <Button
              leftIcon={<ArrowBackIcon />}
              width="7rem"
              background="gray.900"
              fontWeight="medium"
              style={{ color: 'white' }}
              _hover={{ background: 'gray.700' }}
              _active={{
                backgroundColor: 'gray.800',
                transform: 'scale(0.95)',
              }}
              onClick={router.back}
            >
              Go Back
            </Button>
            <Heading as="h1" size="xl">
              My Bets
            </Heading>
          </Stack>
          <Box overflowX="none" paddingBottom={8}>
            <Table w="full">
              <thead>
                <Tr>
                  <Th>Selection</Th>
                  <Th>Odds</Th>
                  <Th>Stake</Th>
                  <Th>Result</Th>
                </Tr>
              </thead>
              <tbody>
                {placedBets.map(bet => (
                  <Box as="tr" key={bet.id}>
                    <Td>
                      {bet.betSlip.map(selection => (
                        <Text key={selection.id}>
                          {selection.name} - {selection.outcome} @
                          {selection.odds}
                        </Text>
                      ))}
                    </Td>
                    <Td>{bet.totalOdds}</Td>
                    <Td>{bet.stake}€</Td>
                    {bet.result === 'placed' || bet.result === 'void' ? (
                      <Td>{bet.result}</Td>
                    ) : null}
                  </Box>
                ))}
              </tbody>
            </Table>
          </Box>
        </Flex>
      ) : (
        <Flex
          margin="0 auto"
          maxW="700px"
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop="200px"
        >
          <Heading as="p" size="lg" marginBottom={6}>
            You haven't placed any bets yet.
          </Heading>
          <Button
            width="250px"
            background="gray.900"
            fontWeight="medium"
            style={{ color: 'white' }}
            _hover={{ background: 'gray.700' }}
            _active={{
              backgroundColor: 'gray.800',
              transform: 'scale(0.95)',
            }}
            onClick={() => router.push('/')}
          >
            Go to main page
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Profile;
