import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '@store';
import { getFeedStateSelector } from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const ordersState = useSelector(getFeedStateSelector);
  const orders: TOrder[] = ordersState.orders;
  const pendingOrders = getOrders(orders, 'pending');
  const readyOrders = getOrders(orders, 'done');
  const feed = { total: ordersState.total, totalToday: ordersState.totalToday };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
