import { Container, SxProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type ParentWrapperProps = {
  sx?: SxProps;
};

export const ParentWrapper: FC<PropsWithChildren<ParentWrapperProps>> = (
  props
) => {
  const { children, ...restProps } = props;
  return (
    <Container
      maxWidth='xl'
      {...restProps}
      style={{ paddingLeft: 48, paddingRight: 48 }}>
      {children}
    </Container>
  );
};
