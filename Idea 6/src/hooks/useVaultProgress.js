import { useCallback, useMemo, useState } from 'react';
import { VAULT_CHAMBERS } from '../data/vaultChambers';

const INITIAL_STATE = { currentChamberId: 1, openedChambers: [], inspectedRepositoryIds: [] };

export function useVaultProgress() {
  const [state, setState] = useState(INITIAL_STATE);
  const chamberStatus = useMemo(() => VAULT_CHAMBERS.map((chamber) => {
    const inspectedCount = chamber.repositoryIds.filter((id) => state.inspectedRepositoryIds.includes(id)).length;
    const previousChamber = VAULT_CHAMBERS.find((item) => item.id === chamber.id - 1);
    const accessible = chamber.id === 1 || previousChamber.repositoryIds.every((id) => state.inspectedRepositoryIds.includes(id));
    return { ...chamber, inspectedCount, totalRepositories: chamber.repositoryIds.length, complete: inspectedCount === chamber.repositoryIds.length, accessible, open: state.openedChambers.includes(chamber.id) };
  }), [state]);

  const currentChamber = chamberStatus.find((chamber) => chamber.id === state.currentChamberId);
  const inspectedCount = state.inspectedRepositoryIds.length;
  const totalRepositoryCount = VAULT_CHAMBERS.reduce((total, chamber) => total + chamber.repositoryIds.length, 0);

  const openChamber = useCallback((chamberId) => {
    setState((previous) => {
      const chamber = VAULT_CHAMBERS.find((item) => item.id === chamberId);
      const previousChamber = VAULT_CHAMBERS.find((item) => item.id === chamberId - 1);
      if (!chamber || (chamberId !== 1 && !previousChamber.repositoryIds.every((id) => previous.inspectedRepositoryIds.includes(id)))) return previous;
      return { ...previous, currentChamberId: chamberId, openedChambers: previous.openedChambers.includes(chamberId) ? previous.openedChambers : [...previous.openedChambers, chamberId] };
    });
  }, []);

  const inspectRepository = useCallback((repositoryId) => {
    setState((previous) => previous.inspectedRepositoryIds.includes(repositoryId) ? previous : { ...previous, inspectedRepositoryIds: [...previous.inspectedRepositoryIds, repositoryId] });
  }, []);

  const navigateToChamber = useCallback((chamberId) => {
    const chamber = chamberStatus.find((item) => item.id === chamberId);
    if (!chamber?.accessible) return false;
    setState((previous) => ({ ...previous, currentChamberId: chamberId }));
    return true;
  }, [chamberStatus]);

  const resetProgress = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, currentChamber, chamberStatus, inspectedCount, totalRepositoryCount, progressPercent: Math.round((inspectedCount / totalRepositoryCount) * 100), allComplete: inspectedCount === totalRepositoryCount, openChamber, inspectRepository, navigateToChamber, resetProgress };
}
