import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request, Response as ResponseType } from '@shared/utils/request';

export const useClaimDaily = (
  options: Partial<UseMutationOptions<ResponseType<Response>, string, string>> = {}
) =>
  useMutation({
    mutationFn: () => request('/api/daily', { method: 'PUT' }),
    ...options
  } as any);

export default useClaimDaily;
