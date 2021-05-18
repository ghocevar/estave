import Image from 'next/image';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react';

import { balanceAtom } from 'atoms';

const Header = () => {
  const [balance] = useAtom(balanceAtom);

  return (
    <Flex
      backgroundColor="white"
      mb={[8, 16]}
      width="full"
      borderTop="5px solid #0AF5F4"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingX={8}
        maxWidth="1260px"
        margin="0 auto"
        width="full"
        height="60px"
      >
        <Flex align="center">
          <Link href="/" passHref>
            <a>
              <Image
                src="/estave-logo.svg"
                width={100}
                height={100}
                alt="e-stave"
              />
            </a>
          </Link>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Link href="/profile" passHref>
            <ChakraLink id="account" marginRight={4}>
              Your Profile
            </ChakraLink>
          </Link>
          <Text>Balance: {balance.toFixed(2)}€</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
