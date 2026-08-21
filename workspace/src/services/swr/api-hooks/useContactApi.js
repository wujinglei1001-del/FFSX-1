import { apiEndpoints } from 'routes/paths';
import axiosFetcher from 'services/axios/axiosFetcher';
import useSWRMutation from 'swr/mutation';

export const useSubmitContactRequest = () =>
  useSWRMutation([apiEndpoints.contactRequests, { method: 'post' }], axiosFetcher);
