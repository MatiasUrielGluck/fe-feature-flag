import { Notify, QNotifyCreateOptions } from 'quasar';

const errorSnackbarProp: QNotifyCreateOptions = {
  position: 'top',
  type: 'negative',
  actions: [
    {
      icon: 'close',
      color: 'white',
      round: true,
    },
  ],
};

// const snackbarMap = {
//   success: errorSnackbarProp,
// };

const snackbarMap = new Map<string, QNotifyCreateOptions>([
  ['success', errorSnackbarProp],
]);

export const showSnackbar = (type: 'success' | 'error', message: string) => {
  const props = snackbarMap.get(type);
  const snackbarProps = { ...props, message };
  Notify.create(snackbarProps);
};
