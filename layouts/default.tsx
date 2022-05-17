import { Header } from '@/components/Header';
import { FC, PropsWithChildren } from 'react';

type DefaultLayoutProps = {};

export const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = (
  props
) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};
