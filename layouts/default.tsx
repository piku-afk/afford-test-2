import { Header } from '@/components/Header';
import { FC, PropsWithChildren } from 'react';

type DefaultLayout = {};

export const DefaultLayout: FC<PropsWithChildren<DefaultLayout>> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
