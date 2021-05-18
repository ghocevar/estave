import { useAtom } from 'jotai';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { betSlipAtom } from 'atoms';

const DeleteSelectionIcon = ({ id }) => {
  const [betSlip, setBetSlip] = useAtom(betSlipAtom);

  const handleDelete = id => {
    const filtredBetSlip = betSlip.filter(selection => selection.id !== id);

    setBetSlip(filtredBetSlip);
  };

  return (
    <IconButton
      size="xs"
      aria-label="Delete feedback"
      icon={<CloseIcon />}
      variant="ghost"
      onClick={() => handleDelete(id)}
    />
  );
};

export default DeleteSelectionIcon;
