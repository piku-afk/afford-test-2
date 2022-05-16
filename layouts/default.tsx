import { Header } from '@/components/Header';
import { FC, PropsWithChildren } from 'react';

type Props = {};

export const DefaultLayout: FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
