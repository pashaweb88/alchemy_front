import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request, Response as ResponseType } from '@shared/utils/request';

type Data = {
  name: string;
  count: number;
};

type Response = any;

export const useClaimElement = (
  options: Partial<UseMutationOptions<ResponseType<Response>, string, Data>> = {}
) =>
  useMutation({
    mutationFn: data => request('/api/claim-element', { data, method: 'POST' }),
    ...options
  });

export default useClaimElement;
