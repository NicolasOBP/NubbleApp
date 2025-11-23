import { useEffect, useState } from 'react';

import { permissionService } from './permissionService';
import { PermissionName, PermissionStatus } from './permissionTypes';

export function usePermission(permissionName: PermissionName) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<PermissionStatus>();

  async function checkPermission() {
    try {
      setIsLoading(true);
      const initialStatus = await permissionService.check(permissionName);

      if (initialStatus === 'denied') {
        const _status = await permissionService.request(permissionName);
        setStatus(_status);
      } else {
        setStatus(initialStatus);
      }
    } catch (error) {
      error;
      setStatus('unavailable');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkPermission();
  });

  return { status, isLoading };
}
