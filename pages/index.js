import { useAtom } from 'jotai';
import { Heading, Box, Grid, GridItem, Flex } from '@chakra-ui/react';

import Header from '@/components/Header';
import Games from '@/components/Games';
import BetSlip from '@/components/BetSlip';

import { betSlipAtom } from 'atoms';

const Home = () => {
  const [betSlip] = useAtom(betSlipAtom);

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Header />
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        <Heading as="h1" size="xl" marginBottom={6}>
          NBA Games
        </Heading>
        <Grid templateColumns="repeat(8, 1fr)" gap={4} paddingBottom={8}>
          <GridItem colSpan={5}>
            <Games />
          </GridItem>
          <GridItem colSpan={3}>{betSlip.length > 0 && <BetSlip />}</GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Home;
