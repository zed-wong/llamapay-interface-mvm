import * as React from 'react';
import { useChainExplorer } from 'hooks';
import Image from 'next/image';
import { IStream } from 'types';
import defaultImage from 'public/empty-token.webp';
import useTokenBalances from 'queries/useTokenBalances';

export function TokenName({ data }: { data: IStream }) {
  // function that returns chain explorer url based on the chain user is connected to
  const { url: chainExplorer } = useChainExplorer();

  const { data: tokens } = useTokenBalances();

  const token = React.useMemo(() => {
    return tokens ? tokens.find((t) => t.tokenAddress.toLowerCase() === data.token.address.toLowerCase()) : null;
  }, [tokens, data]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-6 w-6 flex-shrink-0 items-center rounded-full">
        <Image src={token?.logoURI ?? defaultImage} alt={'Logo of' + data.tokenSymbol} width="18px" height="18px" />
      </div>
      {chainExplorer ? (
        <a href={`${chainExplorer}/address/${data.token.address}`} target="_blank" rel="noopener noreferrer">
          {data.tokenSymbol}
        </a>
      ) : (
        <span>{data.tokenSymbol}</span>
      )}
    </div>
  );
}