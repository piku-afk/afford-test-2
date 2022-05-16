import { Container, SxProps, styled } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const StyledContainer = styled(Container)({
  // paddingLeft: 48,
  // paddingRight: 48,
});

type Props = {
  sx?: SxProps;
};

export const ParentWrapper: FC<PropsWithChildren<Props>> = (props) => {
  const { children, ...restProps } = props;
  return (
    <StyledContainer
      maxWidth='xl'
      {...restProps}
      style={{ paddingLeft: 48, paddingRight: 48 }}>
      {children}
    </StyledContainer>
  );
};
