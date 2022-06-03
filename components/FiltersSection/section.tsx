import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, PropsWithChildren } from 'react';

type FormSectionProps = {
  label: string;
};

export const FormSection: FC<PropsWithChildren<FormSectionProps>> = (props) => {
  const { label, children } = props;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ fontWeight: 600, fontSize: 18, marginBottom: 0.5 }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
};
