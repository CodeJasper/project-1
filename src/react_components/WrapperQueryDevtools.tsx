import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/store/queryClient';

export default function ReactQueryDevtoolsWrapper() {
  return <ReactQueryDevtools initialIsOpen={false} client={queryClient} />;
}