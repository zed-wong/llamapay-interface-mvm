import { useQuery } from 'react-query';
import axios from 'axios';
import { useNetworkProvider } from 'hooks';

interface ITokenList {
  [key: string]: {
    name: string;
    symbol: string;
    logoURI: string;
  };
}

const fetchTokenList = async (id?: string) => {
  if (!id) return null;
  let tokenListURL;
  if (id === 'mvm') {
    tokenListURL = 'https://raw.githubusercontent.com/zed-wong/mvm-tokenlist/main/mvm-tokenlist.json'
  } else {
    tokenListURL = `https://defillama-datasets.s3.eu-central-1.amazonaws.com/tokenlist/${id}.json`
  }
  const { data } = await axios.get(tokenListURL);

  return data ?? {};
};

export function useGetTokenList() {
  const { tokenListId } = useNetworkProvider();

  return useQuery<ITokenList>(['tokenlist', tokenListId], () => fetchTokenList(tokenListId), {
    refetchInterval: 30000,
  });
}
