import { apiEndpoints } from 'routes/paths';
import axiosFetcher from 'services/axios/axiosFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useGetCurrentUser = (config) => {
  const result = useSWR([apiEndpoints.profile, {}, { disableThrowError: true }], axiosFetcher, {
    suspense: true,
    shouldRetryOnError: false,
    errorRetryCount: 0,
    ...config,
  });

  return result;
};

export const useLoginUser = () => {
  const mutation = useSWRMutation([apiEndpoints.login, { method: 'post' }], axiosFetcher);

  return mutation;
};

export const useRegisterUser = () => {
  const mutation = useSWRMutation([apiEndpoints.register, { method: 'post' }], axiosFetcher);

  return mutation;
};

export const useVerifyEmail = () => {
  const mutation = useSWRMutation([apiEndpoints.verifyEmail, { method: 'post' }], axiosFetcher);

  return mutation;
};

export const useLogOutUser = () => {
  const mutation = useSWRMutation([apiEndpoints.logout, { method: 'post' }], axiosFetcher);

  return mutation;
};
export const useSendPasswordResetLink = () => {
  return useSWRMutation([apiEndpoints.forgotPassword, { method: 'post' }], axiosFetcher);
};

export const useSetPassword = () => {
  return useSWRMutation([apiEndpoints.setPassword, { method: 'post' }], axiosFetcher);
};