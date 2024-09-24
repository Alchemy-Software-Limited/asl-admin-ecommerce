import type { ReactNode } from 'react';

import { Modal } from '@mui/material';

// Define prop types
interface CustomGlobalModalProps {
  open?: boolean;
  handleClose?: () => void;
  children?: ReactNode | null;
}


const CustomGlobalModal = ({
  open = false,
  handleClose = () => undefined,
  children,
}: CustomGlobalModalProps) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <>{children}</>
  </Modal>
);

export default CustomGlobalModal;
