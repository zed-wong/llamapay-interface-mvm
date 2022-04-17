import { Tab } from '@headlessui/react';
import { useDialogState } from 'ariakit';
import { FormDialog } from 'components/Dialog';
import React from 'react';
import DisperseForm from './DisperseForm';
import { useAccount } from 'wagmi';
import { useNetworkProvider } from 'hooks';

export function DisperseGasMoney() {
  const disperseDialog = useDialogState();
  const [{ data: accountData }] = useAccount();
  const { unsupported } = useNetworkProvider();

  return (
    <>
      {accountData && !unsupported ? (
        <>
          <button
            onClick={disperseDialog.toggle}
            className="whitespace-nowrap rounded-[10px] border border-[#1BDBAD] bg-[#23BD8F] py-2 px-5 text-sm font-bold text-white shadow-[0px_3px_7px_rgba(0,0,0,0.12)]"
          >
            Send Gas Money
          </button>
          <FormDialog
            dialog={disperseDialog}
            title="Disperse Coins to Multiple Addresses for Gas"
            className="v-min h-min"
          >
            <div className="space-y-3">
              <Tab.Group>
                <Tab.List className="flex space-x-3">
                  <Tab
                    className={({ selected }) =>
                      selected ? 'rounded-xl bg-[#23BD8F] px-3 py-1' : 'rounded-xl bg-[#ffffff] px-3 py-1'
                    }
                  >
                    <span className="font-inter">Equal Amounts</span>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected ? 'rounded-xl bg-[#23BD8F] px-3 py-1' : 'rounded-xl bg-[#ffffff] px-3 py-1'
                    }
                  >
                    <span className="font-inter ">Custom Amounts</span>
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <DisperseForm custom={false} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <DisperseForm custom={true} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </FormDialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
