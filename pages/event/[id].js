import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import {
  Heading,
  Box,
  Button,
  Grid,
  GridItem,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Header from '@/components/Header';
import Game from '@/components/Game';
import BetSlip from '@/components/BetSlip';

import { betSlipAtom } from 'atoms';

import fetcher from '@/utils/fetcher';

const Event = () => {
  const router = useRouter();
  const { id } = router.query;
  const [betSlip] = useAtom(betSlipAtom);

  const { data, error } = useSWR(`/api/competitions/nba/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Header />
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
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
        <Heading as="h1" size="xl" marginY={6}>
          {data ? data.data.name : <Skeleton height="26px" />}
        </Heading>
        <Grid templateColumns="repeat(8, 1fr)" gap={4}>
          <GridItem colSpan={5}>
            {data ? <Game event={data.data} /> : 'loading...'}
          </GridItem>
          <GridItem colSpan={3}>{betSlip.length > 0 && <BetSlip />}</GridItem>
        </Grid>
      </Flex>
      <Box marign="0 auto" maxW="1250px"></Box>
    </Box>
  );
};

export default Event;
