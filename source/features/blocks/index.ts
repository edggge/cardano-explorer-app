import { ApolloClient } from 'apollo-client';
import Action from '../../lib/Action';
import { BlocksApi } from './api';
import { BlocksStore } from './store';

/**
 * Defines the actions that are supported by this feature
 */
export class BlocksActions {
  public fetchLatestBlocks: Action<void> = new Action();
}

/**
 * Defines the interface of this feature
 */
export interface IBlocksFeature {
  actions: BlocksActions;
  api: BlocksApi;
  store: BlocksStore;
  start: () => void;
  stop: () => void;
}

/**
 * Creates a new instance of this feature.
 *
 * This can be useful for testing, features that need to be
 * configured and / or displayed multiple times on the same page.
 */
export const createBlocksFeature = (
  apolloClient: ApolloClient<object>
): IBlocksFeature => {
  const blocksActions = new BlocksActions();
  const blocksApi = new BlocksApi(apolloClient);
  const blocksStore = new BlocksStore(blocksActions, blocksApi);
  return {
    actions: blocksActions,
    api: blocksApi,
    store: blocksStore,
    start() {
      blocksStore.start();
    },
    stop() {
      blocksStore.stop();
    },
  };
};